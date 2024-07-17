import mysql2 from 'mysql2';
import { Pool, Client } from 'pg';
import ConfigManager, { TableDefinitions } from './ConfigManager';

interface DBConfig {
    db_name: string;
    db_username: string;
    db_password: string;
    db_hostname: string;
    db_dialect: string;
    db_port: string;
}

export default class InitializeDB {
    private dbConfig: DBConfig;
    private connection: any;
    private configManager: ConfigManager;

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
        this.configManager = new ConfigManager();
    }

    private mysql2Connection(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            const _connection = mysql2.createConnection({
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

    private postgresSqlConnection(): Promise<number> {
        return new Promise((resolve, reject) => {
            const pool = new Pool({
                user: this.dbConfig.db_username,
                host: this.dbConfig.db_hostname,
                database: this.dbConfig.db_name,
                password: this.dbConfig.db_password,
                port: parseInt(this.dbConfig.db_port),
            });

            pool.connect()
                .then((_connection: any) => {
                    this.connection = _connection;
                    resolve(1);
                })
                .catch((error) => {
                    reject('Connection error: ' + error.message);
                });
        });
    }

    public async setConnection(): Promise<void> {
        switch (this.dbConfig.db_dialect) {
            case 'mysql':
                await this.mysql2Connection();
                break;

            case 'postgres':
                await this.postgresSqlConnection();
                break;

            default:
                throw new Error('Unsupported database dialect');
        }
    }

    public closeConnection(): void {
        if (this.dbConfig.db_dialect === 'postgres' && this.connection) {
            (this.connection as Pool).end();
        } else if (this.dbConfig.db_dialect === 'mysql' && this.connection) {
            (this.connection as mysql2.Connection).end();
        }
    }

    public getConnection(): mysql2.Connection | Pool | Client | null {
        return this.connection;
    }

    public getDBDialect(): string {
        return this.dbConfig.db_dialect;
    }

    public async setInitialMigrateTable(): Promise<boolean> {
        switch (this.dbConfig.db_dialect) {
            case 'mysql':
                return await this.createDefaultDBTables('mysql');

            case 'postgres':
                return await this.createDefaultDBTables('postgress');

            default:
                throw new Error('Unsupported database dialect');
        }
    }

    private async createDefaultDBTables(dbType: string): Promise<boolean> {
        try {
            const tableDefinitions: any = this.configManager.__tableDefinitions();
            const queries = tableDefinitions[dbType].map((tbDefiScript: string) => {
                return new Promise((resolve, reject) => {
                    if (this.connection) {
                        this.connection.query(tbDefiScript, (err: any, result: any) => {
                            if (err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                    } else {
                        reject('No database connection');
                    }
                });
            });

            await Promise.all(queries);

            await this.configManager.setConfig({
                is_permission_tables_migrated: true,
            });

            return true;
        } catch (error: any) {
            throw new Error('Default tables creation error: ' + error.message);
        }
    }
}
