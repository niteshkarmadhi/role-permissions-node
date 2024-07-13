const fs = require('fs');
const path = require('path');

module.exports = class ConfigManager {
    configJsonFilePath = path.join(__dirname, '..', 'utils', 'config.json');
    constructor() {
    }

    getConfig() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.configJsonFilePath, 'utf8', (err, data) => {
                if (err) {
                    reject(err)
                    return;
                }

                let jsonData;
                try {
                    jsonData = JSON.parse(data);
                    resolve(jsonData);
                } catch (parseErr) {
                    reject(parseErr)
                    return;
                }
            });
        });
    }

    setConfig(dataJson) {
        return new Promise((resolve, reject) => {
            this.getConfig()
                .then((jsonData) => {
                    let _jsonData = {
                        ...jsonData,
                        ...dataJson
                    }

                    fs.writeFile(this.configJsonFilePath, JSON.stringify(_jsonData, null, 2), 'utf8', (writeErr) => {
                        if (writeErr) {
                            reject(writeErr);
                            return;
                        }

                        resolve(true)
                    });
                }).catch((error) => {
                    reject(error);
                })
        });
    }
}