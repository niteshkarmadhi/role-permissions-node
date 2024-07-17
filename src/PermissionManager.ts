import BaseDBHandler from './BaseDBHandler';
import GroupController from './controllers/GroupController';
import PermissionController from './controllers/PermissionController';
import UserController from './controllers/UserController';

export default class PermissionManager extends BaseDBHandler {
    protected connection: any;
    protected dBDialect: any;

    constructor(_connection: any, _dBDialect: any) {
        super(_connection, _dBDialect);
        this.connection = _connection;
        this.dBDialect = _dBDialect;
    }

    permissions(_permissionId: any = null): PermissionController {
        return new PermissionController(this.connection, this.dBDialect, _permissionId);
    }

    group(groupId: any = null): GroupController {
        return new GroupController(this.connection, this.dBDialect, groupId);
    }

    user(userId: any): UserController {
        return new UserController(this.connection, this.dBDialect, userId);
    }
}
