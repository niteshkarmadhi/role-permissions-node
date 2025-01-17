import fs from 'fs';
import path from 'path';

export interface TableDefinitions {
    mysql: any;
    postgress: any;
}

export default class ConfigManager {
    private configJsonFilePath: string;

    constructor() {
        this.configJsonFilePath = path.join(__dirname, '..', 'utils', 'config.json');
    }

    public getConfig(): Promise<any> {
        return new Promise((resolve, reject) => {
            fs.readFile(this.configJsonFilePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }

                let jsonData;
                try {
                    jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseErr) {
                    reject(parseErr);
                    return;
                }
            });
        });
    }

    public setConfig(dataJson: any): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.getConfig()
                .then((jsonData) => {
                    const _jsonData = {
                        ...jsonData,
                        ...dataJson
                    };

                    fs.writeFile(this.configJsonFilePath, JSON.stringify(_jsonData, null, 2), 'utf8', (writeErr) => {
                        if (writeErr) {
                            reject(writeErr);
                            return;
                        }

                        resolve(true);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public __tableDefinitions(): TableDefinitions {
        return {
            mysql: [
                `CREATE TABLE permissions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    slug VARCHAR(100) NOT NULL,
                    description TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`,

                `CREATE TABLE groups (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    slug VARCHAR(100) NOT NULL,
                    description TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`,

                `CREATE TABLE group_has_permissions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    group_id INT NOT NULL,
                    permission_id INT NOT NULL,
                    FOREIGN KEY (group_id) REFERENCES groups(id),
                    FOREIGN KEY (permission_id) REFERENCES permissions(id)
                )`,

                `CREATE TABLE user_groups (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    group_id INT NOT NULL,
                    user_id INT NOT NULL,
                    FOREIGN KEY (group_id) REFERENCES groups(id)
                )`,

                `CREATE TABLE user_permissions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    permission_id INT NOT NULL,
                    user_id INT NOT NULL,
                    FOREIGN KEY (permission_id) REFERENCES permissions(id)
                )`
            ],

            postgress: [
                `CREATE TABLE permissions (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    slug VARCHAR(100) NOT NULL,
                    description TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`,

                `CREATE TABLE groups (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    slug VARCHAR(100) NOT NULL,
                    description TEXT,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )`,

                `CREATE TABLE group_has_permissions (
                    id SERIAL PRIMARY KEY,
                    group_id INT NOT NULL REFERENCES groups(id),
                    permission_id INT NOT NULL REFERENCES permissions(id)
                )`,

                `CREATE TABLE user_groups (
                    id SERIAL PRIMARY KEY,
                    group_id INT NOT NULL REFERENCES groups(id),
                    user_id INT NOT NULL
                )`,

                `CREATE TABLE user_permissions (
                    id SERIAL PRIMARY KEY,
                    permission_id INT NOT NULL REFERENCES permissions(id),
                    user_id INT NOT NULL
                )`
            ]
        };
    }
}
