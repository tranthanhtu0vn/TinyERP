import {EventHandlerNotFoundArg} from "./event/eventHandlerNotFoundArg";
export class EventFacade{
    public static onEventHandlerNotFound(args: EventHandlerNotFoundArg){
        console.log("onEventHandlerNotFound", args);
    }
    public static onBadRequest(args: any){
        console.log("onBadRequest", args);
    }
    public static onResourceNotFound(args: any){
        console.log("onResourceNotFound", args);
    }
    public static onUnAuthorizedRequest(args: any){
        console.log("onUnAuthorizedRequest", args);
    }
    public static onGenericError(args: any){
        console.log("onGenericError", args);
    }
}