module.exports = class MySqlHandler {
    connection = null;

    constructor(_connection) {
        this.connection = _connection;
    }

    _prepareInsertQuery(table, inserData) {
        return `INSERT INTO ${table} (${Object.keys(inserData).join(', ')
            }) VALUES (${Object.values(inserData)
                .map(e => `'${e}'`)
                .join(', ')
            });`
    }

    insert(table, values) {
        return new Promise((resolve, reject) => {
            let insertQueries = `INSERT INTO ${table} (${Object.keys(values).join(', ')
                }) VALUES (${Object.values(values)
                    .map(e => `'${e}'`)
                    .join(', ')
                })`;

            this.connection.query(insertQueries, (err, results, fields) => {
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

            const fieldsName = Object.keys(values);
            const optionalFieldValues = fieldsName.map(e => '?').join(', ')
            const insertQuery = `INSERT INTO ${table} (${fieldsName.join(', ')}) VALUES (${optionalFieldValues})`;

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

            const updateQuery = `DELETE FROM ${table} ${condition ? 'WHERE ' + condition : ''}`;

            this.connection.query(updateQuery, (err, results, fields) => {
                if (err) {
                    reject('Error executing the update query:' + err.stack);
                    return;
                }

                resolve(results.insertId);
            });
        });
    }

    select = (query) => {
        return new Promise((resolve, reject) => {
            console.log('query', query)
            this.connection.query(query, (err, results) => {
                if (err) {
                    reject('Error executing the query: ' + err.stack);
                    return;
                }

                resolve(results);
            });
        });
    };

    findOne = (query) => {
        return new Promise((resolve, reject) => {
            this.select(query)
                .then((results) => {
                    resolve(
                        Array.isArray(results) && results.length > 0
                            ? results[0]
                            : null
                    );
                }).catch(reject);
        });
    };
}