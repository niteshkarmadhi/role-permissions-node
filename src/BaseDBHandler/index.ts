import MySqlHandler from "./MySqlHandler";
import PostgresHandler from "./PostgresHandler";

export default class BaseDBHandler {
    protected connection: any;
    protected dBDialect: string | null;
    private dbHandler: any;

    constructor(_connection: any, _dBDialect: string) {
        this.connection = _connection;
        this.dBDialect = _dBDialect;

        switch (this.dBDialect) {
            case 'mysql':
                this.dbHandler = new MySqlHandler(_connection);
                break;

            case 'postgres':
                this.dbHandler = new PostgresHandler(_connection);
                break;

            default:
                break;
        }
    }

    protected async __insert(table: string, values: any[] | object) {
        if (Array.isArray(values)) {
            let multiInsertQuery = values.map(fields => {
                return this.dbHandler.insert(table, fields);
            });

            return Promise.all(multiInsertQuery);
        } else {
            return this.dbHandler.insert(table, values);
        }
    }

    protected __update(table: string, obj: object, condition: any = null) {
        return this.dbHandler.update(table, obj, condition);
    }

    protected __delete(table: string, condition: any = null) {
        return this.dbHandler.delete(table, condition);
    }

    protected __select(query: string) {
        return this.dbHandler.select(query);
    }

    protected __findOne(query: string) {
        return this.dbHandler.findOne(query);
    }

    protected makeValueToArray(...arg: any[]) {
        let results: any[] = [];
        arg.forEach(element => {
            let _result: any[] = [];
            if (!Array.isArray(element)) {
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

    protected prepareForWhereIn(...arg: any[]) {
        let results: any = [];
        arg.forEach(elementArr => {
            if (arg.length > 1) {
                results.push(
                    `(${elementArr.map((e: any) => `'${e}'`).join(',')})`
                );
            } else {
                results = `(${elementArr.map((e: any) => `'${e}'`).join(',')})`;
            }
        });

        return results;
    }

    protected async getIdBySlugs(table: string, arrIdOrSlugs: any[], isSingleId: boolean = false) {
        arrIdOrSlugs = this.makeValueToArray(arrIdOrSlugs);

        if (arrIdOrSlugs.length > 0) {
            let slugs = arrIdOrSlugs.filter(slug => isNaN(Number(slug)));

            if (slugs.length > 0 && slugs.length != arrIdOrSlugs.length) {
                throw new Error('invalid slugs! all values should be slugs');
            } else if (slugs.length > 0) {
                let _slugWhereIn = this.prepareForWhereIn(slugs);
                arrIdOrSlugs = (await this.__select(`select id from ${table} where slug in ${_slugWhereIn}`))
                    .map((e: any) => e.id);
            }
        }

        if (isSingleId) {
            return arrIdOrSlugs.length > 0 ? arrIdOrSlugs[0] : null;
        } else {
            return arrIdOrSlugs;
        }
    }
}
