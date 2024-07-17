import BaseDBHandler from "../BaseDBHandler";
export default class UserController extends BaseDBHandler {
    private userId;
    constructor(connection: any, dBDialect: any, _userId: any);
    revokePermissions(permissionSlug: any): Promise<void>;
    assignPermissions(permissionSlug: any): Promise<void>;
    group(): Promise<any>;
    groups(): Promise<any[]>;
    permissions(): Promise<any[]>;
    assignGroup(groupSlug: any): Promise<void>;
    syncPermissions(permissionSlug: any): Promise<void>;
    private checkPermissions;
    hasPermission(permissionSlug: any): Promise<boolean>;
    can(permissionSlug: any): Promise<boolean>;
    hasAnyPermission(permissionSlug: any): Promise<boolean>;
    hasAllPermissions(permissionSlug: any): Promise<boolean>;
    hasDirectPermission(permissionSlug: any): Promise<boolean>;
    hasAnyDirectPermission(permissionSlug: any): Promise<boolean>;
    hasAllDirectPermissions(permissionSlug: any): Promise<boolean>;
    revokeGroup(groupSlug: any): Promise<void>;
    hasGroup(groupSlug: any): Promise<any>;
    hasAnyGroup(groupSlug: any): Promise<any>;
    hasAllGroups(groupSlug: any): Promise<boolean>;
}
