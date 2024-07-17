"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDBHandler_1 = __importDefault(require("../BaseDBHandler"));
class GroupController extends BaseDBHandler_1.default {
    constructor(connection, dBDialect, _groupId) {
        super(connection, dBDialect);
        this.groupId = null;
        this.groupId = _groupId;
    }
    myAllRoles() {
        return ['lol'];
    }
    create(obj) {
        return this.__insert('groups', obj);
    }
    delete(groupId) {
        return this.__delete('permissions', `id = ${groupId}`);
    }
    getAllGroups() {
        return this.__select('select * from groups');
    }
    revokePermissions(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.groupId) {
                throw new Error("Group id is required");
            }
            let permissionIds = yield this.getIdBySlugs('permissions', permissionSlug);
            let _permissionIds = this.prepareForWhereIn(permissionIds);
            this.__delete('group_has_permissions', `group_id = '${this.groupId}' and permission_id in ${_permissionIds}`);
        });
    }
    assignPermissions(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.groupId) {
                throw new Error("Group id is required");
            }
            let permissionIds = yield this.getIdBySlugs('permissions', permissionSlug);
            permissionIds.forEach((permissionId) => {
                this.__insert('group_has_permissions', {
                    group_id: this.groupId,
                    permission_id: permissionId,
                });
            });
        });
    }
    assignUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.groupId) {
                throw new Error("Group id is required");
            }
            let userIds = this.makeValueToArray(userId);
            userIds.forEach((_userId) => {
                this.__insert('user_groups', {
                    user_id: _userId,
                    group_id: this.groupId,
                });
            });
        });
    }
    getAssignedPermissions() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.groupId) {
                throw new Error("Group id is required");
            }
            let permissionIds = (yield this.__select(`select * from group_has_permissions where group_id = '${this.groupId}'`))
                .map((e) => e.permission_id);
            return yield this.__select(`
            select name, id, slug from permissions where id in ${this.prepareForWhereIn(permissionIds)}
        `);
        });
    }
    getAssignedUserIds() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.groupId) {
                throw new Error("Group id is required");
            }
            else {
                // return (await this.__select(`select * from user_groups where group_id = '${this.groupId}'`))
                //     .map((e: any) => e.user_id);
                return [];
            }
        });
    }
}
exports.default = GroupController;
