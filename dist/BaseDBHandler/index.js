"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MySqlHandler_1 = __importDefault(require("./MySqlHandler"));
const PostgresHandler_1 = __importDefault(require("./PostgresHandler"));
class BaseDBHandler {
    constructor(_connection, _dBDialect) {
        this.connection = _connection;
        this.dBDialect = _dBDialect;
        switch (this.dBDialect) {
            case 'mysql':
                this.dbHandler = new MySqlHandler_1.default(_connection);
                break;
            case 'postgres':
                this.dbHandler = new PostgresHandler_1.default(_connection);
                break;
            default:
                break;
        }
    }
    __insert(table, values) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Array.isArray(values)) {
                let multiInsertQuery = values.map(fields => {
                    return this.dbHandler.insert(table, fields);
                });
                return Promise.all(multiInsertQuery);
            }
            else {
                return this.dbHandler.insert(table, values);
            }
        });
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
            if (!Array.isArray(element)) {
                _result = [element];
            }
            else {
                _result = element;
            }
            if (arg.length > 1) {
                results.push(_result);
            }
            else {
                results = _result;
            }
        });
        return results;
    }
    prepareForWhereIn(...arg) {
        let results = [];
        arg.forEach(elementArr => {
            if (arg.length > 1) {
                results.push(`(${elementArr.map((e) => `'${e}'`).join(',')})`);
            }
            else {
                results = `(${elementArr.map((e) => `'${e}'`).join(',')})`;
            }
        });
        return results;
    }
    getIdBySlugs(table_1, arrIdOrSlugs_1) {
        return __awaiter(this, arguments, void 0, function* (table, arrIdOrSlugs, isSingleId = false) {
            arrIdOrSlugs = this.makeValueToArray(arrIdOrSlugs);
            if (arrIdOrSlugs.length > 0) {
                let slugs = arrIdOrSlugs.filter(slug => isNaN(Number(slug)));
                if (slugs.length > 0 && slugs.length != arrIdOrSlugs.length) {
                    throw new Error('invalid slugs! all values should be slugs');
                }
                else if (slugs.length > 0) {
                    let _slugWhereIn = this.prepareForWhereIn(slugs);
                    arrIdOrSlugs = (yield this.__select(`select id from ${table} where slug in ${_slugWhereIn}`))
                        .map((e) => e.id);
                }
            }
            if (isSingleId) {
                return arrIdOrSlugs.length > 0 ? arrIdOrSlugs[0] : null;
            }
            else {
                return arrIdOrSlugs;
            }
        });
    }
}
exports.default = BaseDBHandler;
