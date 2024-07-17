import BaseDBHandler from "../BaseDBHandler";
export default class PermissionController extends BaseDBHandler {
    private permissionId;
    constructor(connection: any, dBDialect: any, _permissionId: any);
    create(obj: any): Promise<any>;
    delete(permissionId: any): Promise<any>;
    getAllPermissions(): Promise<any[]>;
    assignGroup(groupSlug: any): Promise<void>;
}
