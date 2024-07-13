const MySqlHandler = require("./MysqlHandler");
const PostgresHandler = require("./PostgresHandler");

module.exports = class BaseDBHandler {
    connection = null;
    dBDialect = null;
    dbHandler = null;

    constructor(_connection, _dBDialect) {
        this.connection = _connection;
        this.dBDialect = _dBDialect;

        switch (this.dBDialect) {
            case 'mysql':
                this.dbHandler = new MySqlHandler(_connection);
                break;

            case 'postgres':
                this.dbHandler = new PostgresHandler(_connection)
                break;

            default:
                break;
        }
    }

    __insert(table, values) {
        if (Array.isArray(values)) {
            let multiInsertQuery = values.map(fields => {
                return this.dbHandler.insert(table, fields)
            })

            return Promise.all(multiInsertQuery)
        } else {
            return this.dbHandler.insert(table, values);
        }
    }

    __update(table, obj, condition = null) {
        return this.dbHandler.update(table, obj, condition);
    }
    
    __delete(table, condition = null) {
        return this.dbHandler.delete(table, condition);
    }

    __select(query) {
        return this.dbHandler.select(query);
    }

    __findOne(query) {
        return this.dbHandler.findOne(query);
    }

    makeValueToArray(...arg) {
        let results = [];
        arg.forEach(element => {
            let _result = [];
            if (! Array.isArray(element)) {
                _result = [element];
            } else {
                _result = element;
            }

            if (arg.length > 1) {
                results.push(_result);
            } else {
                results = _result;
            }
        });

        return results;
    }

    prepareForWhereIn(...arg) {
        let results = [];
        arg.forEach(elementArr => {
            if (arg.length > 1) {
                results.push(
                    `(${elementArr.map(e => `'${e}'`)})`
                );
            } else {
                results = `(${elementArr.map(e => `'${e}'`)})`
            }
        });

        return results;
    }

    async getIdBySlugs(table, arrIdOrSlugs, isSingleId = false) {
        arrIdOrSlugs = this.makeValueToArray(arrIdOrSlugs);

        if (arrIdOrSlugs.length > 0) {
            let slugs = arrIdOrSlugs.filter(slug => isNaN(Number(slug)));

            if (slugs.length > 0 && slugs.length != arrIdOrSlugs.length) {
                throw new Error('invalid slugs! all value should be slugs');
            } else if(slugs.length > 0) {
                let _slugWhereIn = this.prepareForWhereIn(slugs);
                arrIdOrSlugs = (await this.__select(`select id from ${table} where slug in ${_slugWhereIn}`))
                    .map(e => e.id)
            }
        }

        if (isSingleId) {
            return arrIdOrSlugs.length > 0 ? arrIdOrSlugs[0] : null;
        } else {
            return arrIdOrSlugs;
        }
    }
}