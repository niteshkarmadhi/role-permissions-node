import PermissionManager from '../PermissionManager';
import ConfigManager from '../utils/ConfigManager';
import DatabaseManager from '../utils/DatabaseManager';

export const initializePermissionManager = async (req: any, res: any, next: any) => {
    const configManager = new ConfigManager();
    const databaseManager = new DatabaseManager();

    try {
        await databaseManager.setConnection();
        const configJson = await configManager.getConfig();
        if (!configJson.is_permission_tables_migrated) {
            await databaseManager.setInitialMigrateTable();
        }

        req.permissionManager = new PermissionManager(
            databaseManager.getConnection(),
            databaseManager.getDBDialect()
        );

        next();

        res.on('finish', () => {
            databaseManager.closeConnection();
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};