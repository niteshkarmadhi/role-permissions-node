"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostgresHandler {
    constructor(_connection) {
        this.select = (query) => {
            return new Promise((resolve, reject) => {
                this.connection.query(query, (err, results) => {
                    if (err) {
                        reject('Error executing the query: ' + err.stack);
                        return;
                    }
                    resolve(results.rows);
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
    insert(table, values) {
        return new Promise((resolve, reject) => {
            const fieldsName = Object.keys(values);
            const _values = Object.values(values)
                .map((value) => {
                return `'${value}'`;
            }).join(', ');
            const insertQuery = `INSERT INTO ${table} (${fieldsName.join(', ')}) VALUES (${_values}) RETURNING *`;
            this.connection.query(insertQuery, (err, results, fields) => {
                if (err) {
                    reject('Error executing the query:' + err.stack);
                    return;
                }
                resolve(results.rows[0]);
            });
        });
    }
    update(table, obj, condition = null) {
        return new Promise((resolve, reject) => {
            const setFieldValues = Object.entries(obj)
                .map(([field, value]) => {
                return ` ${field} = '${value}' `;
            }).join(' , ');
            const updateQuery = `UPDATE ${table} SET ${setFieldValues} ${condition ? 'WHERE ' + condition : ''} RETURNING *`;
            this.connection.query(updateQuery, (err, results, fields) => {
                if (err) {
                    reject('Error executing the update query:' + err.stack);
                    return;
                }
                resolve(results.rows[0]);
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
exports.default = PostgresHandler;
