"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ConfigManager {
    constructor() {
        this.configJsonFilePath = path_1.default.join(__dirname, '..', 'utils', 'config.json');
    }
    getConfig() {
        return new Promise((resolve, reject) => {
            fs_1.default.readFile(this.configJsonFilePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err);
                    return;
                }
                let jsonData;
                try {
                    jsonData = JSON.parse(data);
                    resolve(jsonData);
                }
                catch (parseErr) {
                    reject(parseErr);
                    return;
                }
            });
        });
    }
    setConfig(dataJson) {
        return new Promise((resolve, reject) => {
            this.getConfig()
                .then((jsonData) => {
                const _jsonData = Object.assign(Object.assign({}, jsonData), dataJson);
                fs_1.default.writeFile(this.configJsonFilePath, JSON.stringify(_jsonData, null, 2), 'utf8', (writeErr) => {
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
    __tableDefinitions() {
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
exports.default = ConfigManager;
