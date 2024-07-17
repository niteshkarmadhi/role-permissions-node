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
class PermissionController extends BaseDBHandler_1.default {
    constructor(connection, dBDialect, _permissionId) {
        super(connection, dBDialect);
        this.permissionId = null;
        this.permissionId = _permissionId;
    }
    create(obj) {
        return this.__insert('permissions', obj);
    }
    delete(permissionId) {
        return this.__delete('permissions', `id = ${permissionId}`);
    }
    getAllPermissions() {
        return this.__select('select * from permissions');
    }
    assignGroup(groupSlug) {
        return __awaiter(this, void 0, void 0, function* () {
            let groupIds = yield this.getIdBySlugs('groups', groupSlug);
            groupIds.forEach((groupId) => {
                this.__insert('group_has_permissions', {
                    group_id: groupId,
                    permission_id: this.permissionId,
                });
            });
        });
    }
}
exports.default = PermissionController;
