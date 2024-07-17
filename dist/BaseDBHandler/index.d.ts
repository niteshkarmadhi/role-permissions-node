export default class BaseDBHandler {
    protected connection: any;
    protected dBDialect: string | null;
    private dbHandler;
    constructor(_connection: any, _dBDialect: string);
    protected __insert(table: string, values: any[] | object): Promise<any>;
    protected __update(table: string, obj: object, condition?: any): any;
    protected __delete(table: string, condition?: any): any;
    protected __select(query: string): any;
    protected __findOne(query: string): any;
    protected makeValueToArray(...arg: any[]): any[];
    protected prepareForWhereIn(...arg: any[]): any;
    protected getIdBySlugs(table: string, arrIdOrSlugs: any[], isSingleId?: boolean): Promise<any>;
}
