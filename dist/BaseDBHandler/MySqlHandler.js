"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MySqlHandler {
    constructor(_connection) {
        this.select = (query) => {
            return new Promise((resolve, reject) => {
                this.connection.query(query, (err, results) => {
                    if (err) {
                        reject('Error executing the query: ' + err.stack);
                        return;
                    }
                    resolve(results);
                });
            });
        };
        this.findOne = (query) => {
            return new Promise((resolve, reject) => {
                this.select(query)
                    .then((results) => {
                    resolve(Array.isArray(results) && results.length > 0 ? results[0] : null);
                })
                    .catch(reject);
            });
        };
        this.connection = _connection;
    }
    _prepareInsertQuery(table, insertData) {
        return `INSERT INTO ${table} (${Object.keys(insertData).join(', ')}) VALUES (${Object.values(insertData)
            .map(e => `'${e}'`)
            .join(', ')});`;
    }
    insert(table, values) {
        return new Promise((resolve, reject) => {
            const insertQuery = `INSERT INTO ${table} (${Object.keys(values).join(', ')}) VALUES (${Object.values(values)
                .map(e => `'${e}'`)
                .join(', ')});`;
            this.connection.query(insertQuery, (err, results, fields) => {
                if (err) {
                    reject('Error executing the query:' + err.stack);
                    return;
                }
                resolve(results.insertId);
            });
        });
    }
    insertMany(table, values) {
        return new Promise((resolve, reject) => {
            const fieldsNames = Object.keys(values);
            const optionalFieldValues = fieldsNames.map(() => '?').join(', ');
            const insertQuery = `INSERT INTO ${table} (${fieldsNames.join(', ')}) VALUES (${optionalFieldValues})`;
            this.connection.execute(insertQuery, Object.values(values), (err, results, fields) => {
                if (err) {
                    reject('Error executing the query:' + err.stack);
                    return;
                }
                resolve(results.insertId);
            });
        });
    }
    update(table, obj, condition = null) {
        return new Promise((resolve, reject) => {
            const setFieldValues = Object.entries(obj)
                .map(([field, value]) => {
                return ` ${field} = '${value}' `;
            }).join(' , ');
            const updateQuery = `UPDATE ${table} SET ${setFieldValues} ${condition ? 'WHERE ' + condition : ''}`;
            this.connection.query(updateQuery, (err, results, fields) => {
                if (err) {
                    reject('Error executing the update query:' + err.stack);
                    return;
                }
                resolve(results.insertId);
            });
        });
    }
    delete(table, condition = null) {
        return new Promise((resolve, reject) => {
            const deleteQuery = `DELETE FROM ${table} ${condition ? 'WHERE ' + condition : ''}`;
            this.connection.query(deleteQuery, (err, results, fields) => {
                if (err) {
                    reject('Error executing the delete query:' + err.stack);
                    return;
                }
                resolve(results.affectedRows); // Assuming you want to return the number of affected rows
            });
        });
    }
}
exports.default = MySqlHandler;
