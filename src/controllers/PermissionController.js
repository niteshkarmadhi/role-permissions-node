const BaseDBHandler = require("../BaseDBHandler")

module.exports = class PermissionController extends BaseDBHandler{
    permissionId = null;
    constructor(connection, dBDialect, _permissionId) {
        super(connection, dBDialect);
        this.permissionId = _permissionId;
    }

    create(obj) {
        return this.__insert('permissions', obj)
    }

    delete(permissionId) {
        return this.__delete(`permissions', 'id = ${permissionId}`);
    }

    getAllPermissions() {
        return this.__select('select * from permissions');
    }

    async assignGroup(groupSlug) {
        let groupIds = await this.getIdBySlugs('groups', groupSlug);

        groupIds.forEach((groupId) => {
            this.__insert('group_has_permissions', {
                group_id: groupId,
                permission_id: this.permissionId,
            })
        });
    }
}