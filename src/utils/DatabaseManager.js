const mysql2 = require('mysql2');
const path = require('path');
const ConfigManager = require('./ConfigManager');
const fs = require('fs');
const { Pool } = require('pg');

module.exports = class InitializeDB {
    dbConfig = {
        db_name: "",
        db_username: "",
        db_password: "",
        db_hostname: "",
        db_dialect: "",
        db_port: "",
    }

    connection = null;

    constructor() {
        this.dbConfig = {
            db_name: process.env.DB_NAME || "",
            db_username: process.env.DB_USERNAME || "",
            db_password: process.env.DB_PASSWORD || "",
            db_hostname: process.env.DB_HOSTNAME || "",
            db_dialect: process.env.DB_DIALECT || "",
            db_port: process.env.DB_PORT || "",
        }
    }

    mysql2Connection() {
        return new Promise((resolve, reject) => {
            const _connection = mysql2.createConnection(
                `mysql://${this.dbConfig.db_username}:${this.dbConfig.db_password}@${this.dbConfig.db_hostname}:${this.dbConfig.db_port}/${this.dbConfig.db_name}`
            );

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
            const pool = new Pool({
                user: this.dbConfig.db_username,
                host: this.dbConfig.db_hostname,
                database: this.dbConfig.db_name,
                password: this.dbConfig.db_password,
                port: this.dbConfig.db_port,
            });
    
            pool.connect()
                .then((_connection) => {
                    this.connection = _connection;
                    resolve(1);
                })
                .catch((error) => {
                    reject('connection error ' + error.message);
                });
        });
    }

    setConnection() {
        return new Promise((resolve, reject) => {
            switch (this.dbConfig.db_dialect) {
                case 'mysql':
                    this.mysql2Connection().then(resolve).catch(reject)
                    break;
    
                case 'postgres':
                    this.postgresSqlConnection().then(resolve).catch(reject)
                    break;
    
                default:
                    break;
            }
        });
        
    }

    closeConnection() {
        if (this.dbConfig.db_dialect == 'postgres') {
            this.connection.release();
        }
    }

    getConnection() {
        return this.connection;
    }

    getDBDialect() {
        return this.dbConfig.db_dialect;
    }

    setInitialMigrateTable() {
        switch (this.dbConfig.db_dialect) {
            case 'mysql':
                return this.createDefaultDBTables('mysql');

            case 'postgres':
                return this.createDefaultDBTables('postgress');

            default:
                break;
        }
    }

    createDefaultDBTables(dbType) {
        return new Promise((__resolve, __reject) => {
            fs.readdir(path.join(__dirname, '..', 'dbFiles', dbType), 'utf8', async (err, files) => {
                if (err) {
                    console.error('Error reading folder:', err);
                    return;
                }
    
                let promesses = [];
                files.forEach(file => {
                    const tableDefinations = fs.readFileSync(path.join(__dirname, '..', 'dbFiles', dbType, file), 'utf8');
    
                    promesses.push(
                        new Promise((resolve, reject) => {
                            this.connection.query(tableDefinations, (err, result) => {
                                if (err) {
                                    reject(err);
                                } else {
                                    resolve(result);
                                }
                            })
                        })
                    )
                });

                try {
                    await Promise.all(promesses);
                    const configManager = new ConfigManager();
                    configManager.setConfig({
                        is_permission_tables_migrated: true,
                    })

                    __resolve(true)
                } catch (error) {
                    __reject("Default tables creation error " + error.message);
                }
            });
        });
    }
}