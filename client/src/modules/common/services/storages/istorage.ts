export interface IStorage {
    get(key: string): any;
    set(key: string, data: any): any;
    remove(key: string): void;
    exist(key: string): boolean;
}