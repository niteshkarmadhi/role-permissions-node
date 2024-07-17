// PostgresHandler.d.ts
declare module './PostgresHandler' {
    export default class PostgresHandler {
        connection: any;

        constructor(_connection: any);

        insert(table: string, values: any): Promise<any>;

        update(table: string, obj: any, condition?: string | null): Promise<any>;

        delete(table: string, condition?: string | null): Promise<number>;

        select(query: string): Promise<any>;

        findOne(query: string): Promise<any>;
    }
}
