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
const lodash_1 = __importDefault(require("lodash"));
class UserController extends BaseDBHandler_1.default {
    constructor(connection, dBDialect, _userId) {
        super(connection, dBDialect);
        this.userId = null;
        this.userId = _userId;
    }
    revokePermissions(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let permissionIds = yield this.getIdBySlugs('permissions', permissionSlug);
            this.__delete('group_has_permissions', `user_id = '${this.userId}' and permission_id in ${this.prepareForWhereIn(permissionIds)} `);
        });
    }
    assignPermissions(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let permissionIds = yield this.getIdBySlugs('permissions', permissionSlug);
            permissionIds.forEach((permissionId) => {
                this.__insert('user_permissions', {
                    user_id: this.userId,
                    permission_id: permissionId,
                });
            });
        });
    }
    group() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.__findOne(`
            select 
                groups.slug as slug,
                groups.id as group_id,
                groups.name as group_name
            from 
                user_groups
            join groups on groups.id = user_groups.group_id
            where user_id = '${this.userId}' `);
        });
    }
    groups() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.__select(`
            select 
                groups.slug as slug,
                groups.id as group_id,
                groups.name as group_name
            from 
                user_groups
            join groups on groups.id = user_groups.group_id
            where user_groups.user_id = '${this.userId}' `);
        });
    }
    permissions() {
        return __awaiter(this, void 0, void 0, function* () {
            let permissionIds = [];
            let userGroup = yield this.__findOne(`
            select 
                group_id
            from 
                user_groups
            where user_id = '${this.userId}'`);
            if (userGroup) {
                permissionIds = (yield this.__select(`
                select 
                    permission_id
                from 
                    group_has_permissions
                where group_id = '${userGroup.group_id}'`))
                    .map((item) => item.permission_id);
            }
            let userPermissionIds = (yield this.__select(`
            select 
                permission_id
            from 
                user_permissions
            where user_id = '${this.userId}'`))
                .map((item) => item.permission_id);
            permissionIds = [...permissionIds, ...userPermissionIds];
            return yield this.__select(`
            select name, id, slug from permissions where id in ${this.prepareForWhereIn(permissionIds)}
        `);
        });
    }
    assignGroup(groupSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupSlugs = this.makeValueToArray(groupSlug);
            let groupIds = yield this.getIdBySlugs('groups', groupSlugs);
            groupIds.forEach((groupId) => {
                this.__insert('user_groups', {
                    user_id: this.userId,
                    group_id: groupId,
                });
            });
        });
    }
    syncPermissions(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.__delete('group_has_permissions', `user_id = '${this.userId}'`);
            this.assignPermissions(permissionSlug);
        });
    }
    checkPermissions(permissionSlug_1) {
        return __awaiter(this, arguments, void 0, function* (permissionSlug, isDirectPermission = false) {
            permissionSlug = this.makeValueToArray(permissionSlug);
            let permissionId = yield this.getIdBySlugs('permissions', permissionSlug);
            let user_permissions = yield this.__findOne(`select id from user_permissions where permission_id = '${permissionId}' and user_id = '${this.userId}' `);
            if (isDirectPermission) {
                return user_permissions ? true : false;
            }
            else {
                if (!user_permissions) {
                    let groupIds = (yield this.__select(`select group_id from user_groups where user_id = '${this.userId}' `))
                        .map((e) => e.group_id);
                    let groupBasedPermissionIds = (yield this.__select(`select permission_id from group_has_permissions where group_id in ${this.prepareForWhereIn(groupIds)}`))
                        .map((e) => e.permission_id);
                    return lodash_1.default.intersection(permissionId, groupBasedPermissionIds).length > 0;
                }
                else {
                    return user_permissions ? true : false;
                }
            }
        });
    }
    hasPermission(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.checkPermissions(permissionSlug);
        });
    }
    can(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.checkPermissions(permissionSlug);
        });
    }
    hasAnyPermission(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.checkPermissions(permissionSlug);
            return response[0].total > 0 ? true : false;
        });
    }
    hasAllPermissions(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let permissionIds = this.makeValueToArray(permissionSlug);
            let response = yield this.checkPermissions(permissionIds);
            return response[0].total == permissionIds.length ? true : false;
        });
    }
    hasDirectPermission(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.checkPermissions(permissionSlug, true);
        });
    }
    hasAnyDirectPermission(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield this.checkPermissions(permissionSlug, true);
            return response[0].total > 0 ? true : false;
        });
    }
    hasAllDirectPermissions(permissionSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let permissionIds = this.makeValueToArray(permissionSlug);
            let response = yield this.checkPermissions(permissionIds, true);
            return response[0].total == permissionIds.length ? true : false;
        });
    }
    revokeGroup(groupSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupIds = yield this.getIdBySlugs('groups', groupSlug);
            this.__delete('user_groups', `user_id = '${this.userId}' and group_id in ${this.prepareForWhereIn(groupIds)} `);
        });
    }
    hasGroup(groupSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupId = yield this.getIdBySlugs('groups', groupSlug, true);
            return this.__findOne(`select id from user_groups where user_id = '${this.userId}' and group_id = '${groupId}' `);
        });
    }
    hasAnyGroup(groupSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupIds = yield this.getIdBySlugs('groups', groupSlug);
            return this.__findOne(`select id from user_groups where user_id = '${this.userId}' and group_id in ${this.prepareForWhereIn(groupIds)} `);
        });
    }
    hasAllGroups(groupSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupIds = yield this.getIdBySlugs('groups', groupSlug);
            let response = yield this.__select(`select count(id) as total from user_groups where user_id = '${this.userId}' and group_id in ${this.prepareForWhereIn(groupIds)} `);
            return response[0].total == groupIds.length;
        });
    }
}
exports.default = UserController;
