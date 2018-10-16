import { Promise } from "./../models/promise";
export interface IConnector {
    getJSON(jsonPath: string): Promise;
    post(url: string, data?: any): Promise;
    put(url: string, data: any): Promise;
    get(url: string): Promise;
    delete(url: string): Promise;
}