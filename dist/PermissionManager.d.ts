import BaseDBHandler from './BaseDBHandler';
import GroupController from './controllers/GroupController';
import PermissionController from './controllers/PermissionController';
import UserController from './controllers/UserController';
export default class PermissionManager extends BaseDBHandler {
    protected connection: any;
    protected dBDialect: any;
    constructor(_connection: any, _dBDialect: any);
    permissions(_permissionId?: any): PermissionController;
    group(groupId?: any): GroupController;
    user(userId: any): UserController;
}
