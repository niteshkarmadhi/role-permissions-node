
const PermissionManager = require("../PermissionManager");
const ConfigManager = require("../utils/ConfigManager");
const DatabaseManager = require("../utils/DatabaseManager");

module.exports = () => {
    return async (req, res, next) => {
        const configManager = new ConfigManager();
        const databaseManager = new DatabaseManager();

        try {
            await databaseManager.setConnection();
            const configJson = await configManager.getConfig();
            if (!configJson.is_permission_tables_migrated) {
                await databaseManager.setInitialMigrateTable()
            }

            req.permissionManager = new PermissionManager(
                databaseManager.getConnection(),
                databaseManager.getDBDialect()
            );

            next();

            res.on('finish', () => {
                databaseManager.closeConnection()
            });
        } catch (error) {
            console.log(error)
            next()
        }
    }
}