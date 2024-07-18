import BaseDBHandler from "../BaseDBHandler";

export default class GroupController extends BaseDBHandler {
    private groupId: any = null;

    constructor(connection: any, dBDialect: any, _groupId: any = null) {
        super(connection, dBDialect);
        this.groupId = _groupId;
    }

    create(obj: any): Promise<any> {
        return this.__insert('groups', obj);
    }

    delete(groupId: any): Promise<any> {
        return this.__delete('permissions', `id = ${groupId}`);
    }

    getAllGroups(): Promise<any[]> {
        return this.__select('select * from groups');
    }

    async revokePermissions(permissionSlug: any): Promise<void> {
        if (!this.groupId) {
            throw new Error("Group id is required");
        }

        let permissionIds = await this.getIdBySlugs('permissions', permissionSlug);
        let _permissionIds = this.prepareForWhereIn(permissionIds);

        this.__delete('group_has_permissions', `group_id = '${this.groupId}' and permission_id in ${_permissionIds}`);
    }

    async assignPermissions(permissionSlug: any): Promise<void> {
        if (!this.groupId) {
            throw new Error("Group id is required");
        }

        let permissionIds = await this.getIdBySlugs('permissions', permissionSlug);

        permissionIds.forEach((permissionId: any) => {
            this.__insert('group_has_permissions', {
                group_id: this.groupId,
                permission_id: permissionId,
            });
        });
    }

    async assignUser(userId: any): Promise<void> {
        if (!this.groupId) {
            throw new Error("Group id is required");
        }

        let userIds = this.makeValueToArray(userId);

        userIds.forEach((_userId: any) => {
            this.__insert('user_groups', {
                user_id: _userId,
                group_id: this.groupId,
            });
        });
    }

    async getAssignedPermissions(): Promise<any[]> {
        if (!this.groupId) {
            throw new Error("Group id is required");
        }

        let permissionIds = (await this.__select(`select * from group_has_permissions where group_id = '${this.groupId}'`))
            .map((e: any) => e.permission_id);

        return await this.__select(`
            select name, id, slug from permissions where id in ${this.prepareForWhereIn(permissionIds)}
        `);
    }

    async getAssignedUserIds(): Promise<any[]> {
        if (!this.groupId) {
            throw new Error("Group id is required");
        }
        
        return (await this.__select(`select * from user_groups where group_id = '${this.groupId}'`))
            .map((e: any) => e.user_id);
    }
}
