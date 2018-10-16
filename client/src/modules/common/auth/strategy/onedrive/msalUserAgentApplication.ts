import { IAuthorizeOption } from "../iauthorizeOption";
import {Promise} from "../../../models/promise";
export class MSALUserAgentApplication{
    constructor(option: IAuthorizeOption){
        // var clientApplication:IMSALUserAgentApplication = <IMSALUserAgentApplication>new window.Msal.UserAgentApplication(option.clientId, null, function (errorDesc:string, token:string, error:string, tokenType:string) {
        //     console.log("clientApplication:", arguments);
        // });
        var clientApplication:IMSALUserAgentApplication = <IMSALUserAgentApplication>window.createMsalClientAgent(option.clientId);
        clientApplication.option=option;
        return clientApplication;
    }
}

export interface IMSALUserAgentApplication{
    option: IAuthorizeOption;
    loginPopup(scope:Array<string>):Promise;
    acquireTokenPopup(scope:Array<string>):Promise;
    acquireTokenSilent(scope:Array<string>):Promise;
}