import BaseDBHandler from "../BaseDBHandler";
export default class GroupController extends BaseDBHandler {
    private groupId;
    constructor(connection: any, dBDialect: any, _groupId: any);
    myAllRoles(): string[];
    create(obj: any): Promise<any>;
    delete(groupId: any): Promise<any>;
    getAllGroups(): Promise<any[]>;
    revokePermissions(permissionSlug: any): Promise<void>;
    assignPermissions(permissionSlug: any): Promise<void>;
    assignUser(userId: any): Promise<void>;
    getAssignedPermissions(): Promise<any[]>;
    getAssignedUserIds(): Promise<any[]>;
}
