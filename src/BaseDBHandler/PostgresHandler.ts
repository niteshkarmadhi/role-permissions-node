export default class PostgresHandler {
    connection: any;

    constructor(_connection: any) {
        this.connection = _connection;
    }

    insert(table: string, values: any) {
        return new Promise<any>((resolve, reject) => {
            const fieldsName = Object.keys(values);
            const _values = Object.values(values)
                .map((value: any) => {
                    return `'${value}'`;
                }).join(', ');
            const insertQuery = `INSERT INTO ${table} (${fieldsName.join(', ')}) VALUES (${_values}) RETURNING *`;

            this.connection.query(insertQuery, (err: any, results: any, fields: any) => {
                if (err) {
                    reject('Error executing the query:' + err.stack);
                    return;
                }

                resolve(results.rows[0]);
            });
        });
    }

    update(table: string, obj: any, condition: string | null = null) {
        return new Promise<any>((resolve, reject) => {
            const setFieldValues = Object.entries(obj)
                .map(([field, value]) => {
                    return ` ${field} = '${value}' `;
                }).join(' , ');

            const updateQuery = `UPDATE ${table} SET ${setFieldValues} ${condition ? 'WHERE ' + condition : ''} RETURNING *`;

            this.connection.query(updateQuery, (err: any, results: any, fields: any) => {
                if (err) {
                    reject('Error executing the update query:' + err.stack);
                    return;
                }

                resolve(results.rows[0]);
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

                resolve(results.rows);
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
