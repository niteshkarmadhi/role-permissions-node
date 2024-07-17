import BaseDBHandler from "../BaseDBHandler";
import _lodash from "lodash";

export default class UserController extends BaseDBHandler {
    userId: any = null;

    constructor(connection: any, dBDialect: any, _userId: any) {
        super(connection, dBDialect);
        this.userId = _userId;
    }

    async revokePermissions(permissionSlug: any): Promise<void> {
        let permissionIds = await this.getIdBySlugs('permissions', permissionSlug);
        this.__delete('group_has_permissions', `user_id = '${this.userId}' and permission_id in ${this.prepareForWhereIn(permissionIds)} `);
    }

    async assignPermissions(permissionSlug: any): Promise<void> {
        let permissionIds = await this.getIdBySlugs('permissions', permissionSlug);
        permissionIds.forEach((permissionId: any) => {
            this.__insert('user_permissions', {
                user_id: this.userId,
                permission_id: permissionId,
            });
        });
    }

    async group(): Promise<any> {
        return await this.__findOne(`
            select 
                groups.slug as slug,
                groups.id as group_id,
                groups.name as group_name
            from 
                user_groups
            join groups on groups.id = user_groups.group_id
            where user_id = '${this.userId}' `);
    }

    async groups(): Promise<any[]> {
        return await this.__select(`
            select 
                groups.slug as slug,
                groups.id as group_id,
                groups.name as group_name
            from 
                user_groups
            join groups on groups.id = user_groups.group_id
            where user_groups.user_id = '${this.userId}' `);
    }

    async permissions(): Promise<any[]> {
        let permissionIds: any[] = [];
        let userGroup = await this.__findOne(`
            select 
                group_id
            from 
                user_groups
            where user_id = '${this.userId}'`);

        if (userGroup) {
            permissionIds = (await this.__select(`
                select 
                    permission_id
                from 
                    group_has_permissions
                where group_id = '${userGroup.group_id}'`))
            .map((item: any) => item.permission_id);
        }

        let userPermissionIds = (await this.__select(`
            select 
                permission_id
            from 
                user_permissions
            where user_id = '${this.userId}'`))
        .map((item: any) => item.permission_id);

        permissionIds = [...permissionIds, ...userPermissionIds];

        return await this.__select(`
            select name, id, slug from permissions where id in ${this.prepareForWhereIn(permissionIds)}
        `);
    }

    async assignGroup(groupSlug: any): Promise<void> {
        let groupSlugs = this.makeValueToArray(groupSlug);
        let groupIds = await this.getIdBySlugs('groups', groupSlugs);

        groupIds.forEach((groupId: any) => {
            this.__insert('user_groups', {
                user_id: this.userId,
                group_id: groupId,
            });
        });
    }

    async syncPermissions(permissionSlug: any): Promise<void> {
        await this.__delete('group_has_permissions', `user_id = '${this.userId}'`);

        this.assignPermissions(permissionSlug);
    }

    async checkPermissions(permissionSlug: any, isDirectPermission = false): Promise<boolean> {
        permissionSlug = this.makeValueToArray(permissionSlug);
        let permissionId = await this.getIdBySlugs('permissions', permissionSlug);
        let user_permissions = await this.__findOne(`select id from user_permissions where permission_id = '${permissionId}' and user_id = '${this.userId}' `);

        if (isDirectPermission) {
            return user_permissions ? true : false;
        } else {
            if (!user_permissions) {
                let groupIds = (await this.__select(`select group_id from user_groups where user_id = '${this.userId}' `))
                    .map((e: any) => e.group_id);

                let groupBasedPermissionIds = (await this.__select(`select permission_id from group_has_permissions where group_id in ${this.prepareForWhereIn(groupIds)}`))
                    .map((e: any) => e.permission_id);

                return _lodash.intersection(permissionId, groupBasedPermissionIds).length > 0;
            } else {
                return user_permissions ? true : false;
            }
        }
    }

    async hasPermission(permissionSlug: any): Promise<boolean> {
        return await this.checkPermissions(permissionSlug);
    }

    async can(permissionSlug: any): Promise<boolean> {
        return await this.checkPermissions(permissionSlug);
    }

    async hasAnyPermission(permissionSlug: any): Promise<boolean> {
        let response: any = await this.checkPermissions(permissionSlug);
        return response[0].total > 0 ? true : false;
    }

    async hasAllPermissions(permissionSlug: any): Promise<boolean> {
        let permissionIds = this.makeValueToArray(permissionSlug);
        let response: any = await this.checkPermissions(permissionIds);
        return response[0].total == permissionIds.length ? true : false;
    }

    async hasDirectPermission(permissionSlug: any): Promise<boolean> {
        return await this.checkPermissions(permissionSlug, true);
    }

    async hasAnyDirectPermission(permissionSlug: any): Promise<boolean> {
        let response: any = await this.checkPermissions(permissionSlug, true);
        return response[0].total > 0 ? true : false;
    }

    async hasAllDirectPermissions(permissionSlug: any): Promise<boolean> {
        let permissionIds = this.makeValueToArray(permissionSlug);
        let response: any = await this.checkPermissions(permissionIds, true);
        return response[0].total == permissionIds.length ? true : false;
    }

    async revokeGroup(groupSlug: any): Promise<void> {
        let groupIds = await this.getIdBySlugs('groups', groupSlug);
        this.__delete('user_groups', `user_id = '${this.userId}' and group_id in ${this.prepareForWhereIn(groupIds)} `);
    }

    async hasGroup(groupSlug: any): Promise<any> {
        let groupId = await this.getIdBySlugs('groups', groupSlug, true);
        return this.__findOne(`select id from user_groups where user_id = '${this.userId}' and group_id = '${groupId}' `);
    }

    async hasAnyGroup(groupSlug: any): Promise<any> {
        let groupIds = await this.getIdBySlugs('groups', groupSlug);
        return this.__findOne(`select id from user_groups where user_id = '${this.userId}' and group_id in ${this.prepareForWhereIn(groupIds)} `);
    }

    async hasAllGroups(groupSlug: any): Promise<boolean> {
        let groupIds = await this.getIdBySlugs('groups', groupSlug);
        let response = await this.__select(`select count(id) as total from user_groups where user_id = '${this.userId}' and group_id in ${this.prepareForWhereIn(groupIds)} `);
        return response[0].total == groupIds.length;
    }
}
