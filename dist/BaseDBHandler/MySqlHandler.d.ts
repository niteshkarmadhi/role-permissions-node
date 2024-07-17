export default class MySqlHandler {
    connection: any;
    constructor(_connection: any);
    _prepareInsertQuery(table: string, insertData: any): string;
    insert(table: string, values: any): Promise<number>;
    insertMany(table: string, values: any): Promise<number>;
    update(table: string, obj: any, condition?: string | null): Promise<number>;
    delete(table: string, condition?: string | null): Promise<number>;
    select: (query: string) => Promise<any>;
    findOne: (query: string) => Promise<any>;
}
