const BaseDBHandler = require('./BaseDBHandler');
const GroupController = require('./controllers/GroupController');
const PermissionController = require('./controllers/PermissionController');
const UserController = require('./controllers/UserController');

module.exports = class PermissionManager extends BaseDBHandler {
    permissionController = null;
    groupController = null;
    connection = null;
    dBDialect = null;

    constructor(_connection, _dBDialect) {
        super(_connection, _dBDialect);
        this.connection = _connection;
        this.dBDialect = _dBDialect;
    }

    permissions() {
        return new PermissionController(this.connection, this.dBDialect);
    }

    group(groupId) {
        return new GroupController(this.connection, this.dBDialect, groupId);
    }

    user(userId) {
        return new UserController(this.connection, this.dBDialect, userId);
    }
}