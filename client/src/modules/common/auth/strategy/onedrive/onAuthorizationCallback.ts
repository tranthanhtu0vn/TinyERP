import { StorageType } from "../../../enum";
import settingHelper from "../../../helpers/settingHelper";
import routerHelper from "../../../helpers/routerHelper";
import {EventNames} from "../../../enum";

export class OnAuthorizationCallback{
    public target:any;
    public eventName:string;
    public type:StorageType;
    public clientId:string;
    public redirectUri:string;
    constructor(type:StorageType, clientId:string, redirectUri:string){
        this.target=window;
        this.eventName=EventNames.LOAD;
        this.type=type;
        this.clientId=clientId;
        this.redirectUri=redirectUri;
    }
    public execute(target: any):void{
        if(!this.isValid(target)){
            console.log("Current context was not match as expected for OnAuthorizationCallback");
            return;
        }
        let searchParam: URLSearchParams  = new URLSearchParams(window.location.search);
        let code:string = searchParam.get("code");
        let url= settingHelper.getAuthorizationReceiverUrl({type: this.type, clientId: this.clientId, authorizationCode:code});
        routerHelper.navigate(url);
    }

    private isValid(target:any):boolean{
        if(!window.location.toString().startsWith(this.redirectUri)){return false;}
        let searchParam: URLSearchParams  = new URLSearchParams(window.location.search);
        let code:string = searchParam.get("code");
        if(String.isNullOrWhiteSpace(code)){return false;}
        return true;
    }
}