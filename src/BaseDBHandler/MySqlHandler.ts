export default class MySqlHandler {
    connection: any;

    constructor(_connection: any) {
        this.connection = _connection;
    }

    _prepareInsertQuery(table: string, insertData: any) {
        return `INSERT INTO ${table} (${Object.keys(insertData).join(', ')}) VALUES (${Object.values(insertData)
            .map(e => `'${e}'`)
            .join(', ')});`;
    }

    insert(table: string, values: any) {
        return new Promise<number>((resolve, reject) => {
            const insertQuery = `INSERT INTO ${table} (${Object.keys(values).join(', ')}) VALUES (${Object.values(values)
                .map(e => `'${e}'`)
                .join(', ')});`;

            this.connection.query(insertQuery, (err: any, results: any, fields: any) => {
                if (err) {
                    reject('Error executing the query:' + err.stack);
                    return;
                }

                resolve(results.insertId);
            });
        });
    }

    insertMany(table: string, values: any) {
        return new Promise<number>((resolve, reject) => {
            const fieldsNames = Object.keys(values);
            const optionalFieldValues = fieldsNames.map(() => '?').join(', ');
            const insertQuery = `INSERT INTO ${table} (${fieldsNames.join(', ')}) VALUES (${optionalFieldValues})`;

            this.connection.execute(insertQuery, Object.values(values), (err: any, results: any, fields: any) => {
                if (err) {
                    reject('Error executing the query:' + err.stack);
                    return;
                }

                resolve(results.insertId);
            });
        });
    }

    update(table: string, obj: any, condition: string | null = null) {
        return new Promise<number>((resolve, reject) => {
            const setFieldValues = Object.entries(obj)
                .map(([field, value]) => {
                    return ` ${field} = '${value}' `;
                }).join(' , ');

            const updateQuery = `UPDATE ${table} SET ${setFieldValues} ${condition ? 'WHERE ' + condition : ''}`;

            this.connection.query(updateQuery, (err: any, results: any, fields: any) => {
                if (err) {
                    reject('Error executing the update query:' + err.stack);
                    return;
                }

                resolve(results.insertId);
            });
        });
    }

    delete(table: string, condition: string | null = null) {
        return new Promise<number>((resolve, reject) => {
            const deleteQuery = `DELETE FROM ${table} ${condition ? 'WHERE ' + condition : ''}`;

            this.connection.query(deleteQuery, (err: any, results: any, fields: any) => {
                if (err) {
                    reject('Error executing the delete query:' + err.stack);
                    return;
                }

                resolve(results.affectedRows); // Assuming you want to return the number of affected rows
            });
        });
    }

    select = (query: string) => {
        return new Promise<any>((resolve, reject) => {
            this.connection.query(query, (err: any, results: any) => {
                if (err) {
                    reject('Error executing the query: ' + err.stack);
                    return;
                }

                resolve(results);
            });
        });
    };

    findOne = (query: string) => {
        return new Promise<any>((resolve, reject) => {
            this.select(query)
                .then((results: any) => {
                    resolve(Array.isArray(results) && results.length > 0 ? results[0] : null);
                })
                .catch(reject);
        });
    };
}
