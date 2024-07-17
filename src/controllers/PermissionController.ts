import BaseDBHandler from "../BaseDBHandler";

export default class PermissionController extends BaseDBHandler {
    private permissionId: any = null;

    constructor(connection: any, dBDialect: any, _permissionId: any) {
        super(connection, dBDialect);
        this.permissionId = _permissionId;
    }

    create(obj: any): Promise<any> {
        return this.__insert('permissions', obj);
    }

    delete(permissionId: any): Promise<any> {
        return this.__delete('permissions', `id = ${permissionId}`);
    }

    getAllPermissions(): Promise<any[]> {
        return this.__select('select * from permissions');
    }

    async assignGroup(groupSlug: any): Promise<void> {
        if (!this.permissionId) {
            throw new Error("permission id is required");
        }

        let groupIds = await this.getIdBySlugs('groups', groupSlug);

        groupIds.forEach((groupId: any) => {
            this.__insert('group_has_permissions', {
                group_id: groupId,
                permission_id: this.permissionId,
            });
        });
    }
}
