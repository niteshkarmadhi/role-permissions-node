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
exports.initializePermissionManager = void 0;
const PermissionManager_1 = __importDefault(require("../PermissionManager"));
const ConfigManager_1 = __importDefault(require("../utils/ConfigManager"));
const DatabaseManager_1 = __importDefault(require("../utils/DatabaseManager"));
const initializePermissionManager = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const configManager = new ConfigManager_1.default();
    const databaseManager = new DatabaseManager_1.default();
    try {
        yield databaseManager.setConnection();
        const configJson = yield configManager.getConfig();
        if (!configJson.is_permission_tables_migrated) {
            yield databaseManager.setInitialMigrateTable();
        }
        req.permissionManager = new PermissionManager_1.default(databaseManager.getConnection(), databaseManager.getDBDialect());
        next();
        res.on('finish', () => {
            databaseManager.closeConnection();
        });
    }
    catch (error) {
        console.log(error);
        next(error);
    }
});
exports.initializePermissionManager = initializePermissionManager;
