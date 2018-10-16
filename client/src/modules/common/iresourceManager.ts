export interface IResourceManager {
    resolve(key: string, ...params: Array<any>): string;
    load(modules: Array<string>): void;
    getResourceData(): any;
}