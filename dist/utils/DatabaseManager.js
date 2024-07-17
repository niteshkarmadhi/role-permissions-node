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
const mysql2_1 = __importDefault(require("mysql2"));
const pg_1 = require("pg");
const ConfigManager_1 = __importDefault(require("./ConfigManager"));
class InitializeDB {
    constructor() {
        this.dbConfig = {
            db_name: process.env.DB_NAME || "",
            db_username: process.env.DB_USERNAME || "",
            db_password: process.env.DB_PASSWORD || "",
            db_hostname: process.env.DB_HOSTNAME || "",
            db_dialect: process.env.DB_DIALECT || "",
            db_port: process.env.DB_PORT || "",
        };
        this.connection = null;
        this.configManager = new ConfigManager_1.default();
    }
    mysql2Connection() {
        return new Promise((resolve, reject) => {
            const _connection = mysql2_1.default.createConnection({
                host: this.dbConfig.db_hostname,
                user: this.dbConfig.db_username,
                password: this.dbConfig.db_password,
                database: this.dbConfig.db_name,
                port: parseInt(this.dbConfig.db_port),
            });
            _connection.connect((err) => {
                if (err) {
                    reject('Error connecting to MySQL:' + err.stack);
                    return;
                }
                this.connection = _connection;
                resolve(true);
            });
        });
    }
    postgresSqlConnection() {
        return new Promise((resolve, reject) => {
            const pool = new pg_1.Pool({
                user: this.dbConfig.db_username,
                host: this.dbConfig.db_hostname,
                database: this.dbConfig.db_name,
                password: this.dbConfig.db_password,
                port: parseInt(this.dbConfig.db_port),
            });
            pool.connect()
                .then((_connection) => {
                this.connection = _connection;
                resolve(1);
            })
                .catch((error) => {
                reject('Connection error: ' + error.message);
            });
        });
    }
    setConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.dbConfig.db_dialect) {
                case 'mysql':
                    yield this.mysql2Connection();
                    break;
                case 'postgres':
                    yield this.postgresSqlConnection();
                    break;
                default:
                    throw new Error('Unsupported database dialect');
            }
        });
    }
    closeConnection() {
        if (this.dbConfig.db_dialect === 'postgres' && this.connection) {
            this.connection.end();
        }
        else if (this.dbConfig.db_dialect === 'mysql' && this.connection) {
            this.connection.end();
        }
    }
    getConnection() {
        return this.connection;
    }
    getDBDialect() {
        return this.dbConfig.db_dialect;
    }
    setInitialMigrateTable() {
        return __awaiter(this, void 0, void 0, function* () {
            switch (this.dbConfig.db_dialect) {
                case 'mysql':
                    return yield this.createDefaultDBTables('mysql');
                case 'postgres':
                    return yield this.createDefaultDBTables('postgress');
                default:
                    throw new Error('Unsupported database dialect');
            }
        });
    }
    createDefaultDBTables(dbType) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tableDefinitions = this.configManager.__tableDefinitions();
                const queries = tableDefinitions[dbType].map((tbDefiScript) => {
                    return new Promise((resolve, reject) => {
                        if (this.connection) {
                            this.connection.query(tbDefiScript, (err, result) => {
                                if (err) {
                                    reject(err);
                                }
                                else {
                                    resolve(result);
                                }
                            });
                        }
                        else {
                            reject('No database connection');
                        }
                    });
                });
                yield Promise.all(queries);
                yield this.configManager.setConfig({
                    is_permission_tables_migrated: true,
                });
                return true;
            }
            catch (error) {
                throw new Error('Default tables creation error: ' + error.message);
            }
        });
    }
}
exports.default = InitializeDB;
