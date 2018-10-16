export interface ICacheService {
    get(key: string): any;
    set(key: string, data: any): any;
    remove(key:string):void;
    exist(key:string): boolean;
}