const BaseDBHandler = require("../BaseDBHandler")

module.exports = class GroupController extends BaseDBHandler{
    groupId = null;
    constructor(connection, dBDialect, _groupId) {
        super(connection, dBDialect);
        this.groupId = _groupId;
    }

    create(obj) {
        return this.__insert('groups', obj)
    }

    delete(groupId) {
        return this.__delete(`permissions', 'id = ${groupId}`);
    }

    getAllGroups() {
        return this.__select('select * from groups');
    }

    async revokePermissions(permissionSlug) {
        let permissionIds = await this.getIdBySlugs('permissions', permissionSlug);
        let _permissionIds = this.prepareForWhereIn(permissionIds);

        this.__delete('group_has_permissions', `group_id = '${this.groupId}' and permission_id in ${_permissionIds} `);
    }

    async assignPermissions(permissionSlug) {
        let permissionIds = await this.getIdBySlugs('permissions', permissionSlug);

        permissionIds.forEach((permissionId) => {
            this.__insert('group_has_permissions', {
                group_id: this.groupId,
                permission_id: permissionId,
            })
        });
    }

    async assignUser(userId) {
        let userIds = this.makeValueToArray(userId);

        userIds.forEach((_userId) => {
            this.__insert('user_groups', {
                user_id: _userId,
                group_id: this.groupId,
            })
        });
    }

    async getAssignedPermissions() {
        let permissionIds = (await this.__select(`select * from group_has_permissions where group_id = '${this.groupId}'`))
            .map(e => e.permission_id);

        return await this.__select(`
            select name, id, slug from permissions where id in ${this.prepareForWhereIn(permissionIds)}
        `)
    }

    async getAssignedUserIds() {
        return (await this.__select(`select * from user_groups where group_id = '${this.groupId}'`))
            .map(e => e.user_id);
    }
}