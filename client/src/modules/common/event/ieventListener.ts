export interface IEventListener{
    target: any;
    eventName:string;
    execute(target: any):void;
}