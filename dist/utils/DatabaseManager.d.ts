import mysql2 from 'mysql2';
import { Pool, Client } from 'pg';
export default class InitializeDB {
    private dbConfig;
    private connection;
    private configManager;
    constructor();
    private mysql2Connection;
    private postgresSqlConnection;
    setConnection(): Promise<void>;
    closeConnection(): void;
    getConnection(): mysql2.Connection | Pool | Client | null;
    getDBDialect(): string;
    setInitialMigrateTable(): Promise<boolean>;
    private createDefaultDBTables;
}
