export interface TableDefinitions {
    mysql: any;
    postgress: any;
}
export default class ConfigManager {
    private configJsonFilePath;
    constructor();
    getConfig(): Promise<any>;
    setConfig(dataJson: any): Promise<boolean>;
    __tableDefinitions(): TableDefinitions;
}
