declare interface Window {
    ioc: any;
    jQuery: any;
    //shortcut to jquery
    $: any;
    Sys: any;
    require: any;
    tinymce: any;
    System: any;
    toastr: any;
    APP_NAME:string;
    EventNames: EventNames;
    triggerEvent(evName:string, ...params: Array<any>):void;
    Reflect: any;
    Msal:any;
    moment: any;
    createMsalClientAgent(clientId:string):any;
}

interface Number{
    milisecondToDay():number;
}

interface EventNames {
    SIDEBAR_MENU_CHANGED: string;
}

interface StringConstructor {
    format(...params: Array<any>): string;
    isNullOrWhiteSpace(value: string): boolean;
    empty: string;
    firstCharToLower(str: string): string;
    toPascalCase(str: string): string;

}
interface String {
    startWith(str: string): boolean;
    contains(str: string): boolean;
    toUTCFormat(): string;
}

interface ArrayConstructor {
    Empty: Array<any>;
    any(array: Array<any>): boolean;
}

interface Date {
    format(format: string): string;
}
interface Array<T> {
    firstOrDefault(callback?: any): any;
    removeItem(item: any): Array<any>;
    any(callback?: any): boolean;
    toString(saperator?: string): string;
    merge(items: Array<any>, predicate: any): Array<any>;
    pushArray(items: Array<any>): void;
    clone(items: Array<any>): void;
    remove(cb: any): Array<any>;
    where(cb: Function): Array<T>;
    each(cb: Function, index?: number, _this?: Array<T>): Array<T>;
    toArray(cb: Function): Array<any>;
    intersect(arr: Array<any>, hashFunc: Function): Array<any>;
    toHashtable(predicate:Function):Array<T>;
}

interface Route {
    name?: string;
}
declare namespace Stimulsoft.Viewer {
    export enum StiWebViewMode {
        WholeReport
    }
    export class StiViewerOptions {
        appearance: any;
        toolbar: any;
        width: any;
        height: any;
    }
    export class StiViewer {
        constructor(...params: Array<any>);

    }
}

declare namespace Stimulsoft.Report {
    export class StiReport {
        loadFile(path: string): void;
    }
}
declare namespace Stimulsoft.System.Drawing {
    export enum Color {
        navy
    }
}

interface IAppSetting {
    import(settings: Array<IAppSettingItem>): void;
}
interface IAppSettingItem {
    name: string;
    value: string;
}

declare module "*.json" {
    const value: any;
    export default value;
}

interface IIoCConfigItem{
    name: string,
    instance: any,
    lifeCycle: any
}


interface IDropdownFormItem{
    value: string;
    text: string;
}

interface ISearchResult{
    items:Array<any>;
}

interface IFormSelectItem{
    value:string;
    text:string;
    selected:boolean;
}

interface IUserProfile{
    id:string;
    firstName:string;
    lastName:string;
    fullName:string;
    email:string;
    avatar:string;
    authToken:string;
    authorization:string;
}

interface IValidationError{
    key:string;
    params?:any;
}

interface IException{
    errors: Array<IValidationError>;
}
