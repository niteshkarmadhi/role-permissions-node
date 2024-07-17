"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDBHandler_1 = __importDefault(require("./BaseDBHandler"));
const GroupController_1 = __importDefault(require("./controllers/GroupController"));
const PermissionController_1 = __importDefault(require("./controllers/PermissionController"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
class PermissionManager extends BaseDBHandler_1.default {
    constructor(_connection, _dBDialect) {
        super(_connection, _dBDialect);
        this.connection = _connection;
        this.dBDialect = _dBDialect;
    }
    permissions(_permissionId = null) {
        return new PermissionController_1.default(this.connection, this.dBDialect, _permissionId);
    }
    group(groupId = null) {
        return new GroupController_1.default(this.connection, this.dBDialect, groupId);
    }
    user(userId) {
        return new UserController_1.default(this.connection, this.dBDialect, userId);
    }
}
exports.default = PermissionManager;
