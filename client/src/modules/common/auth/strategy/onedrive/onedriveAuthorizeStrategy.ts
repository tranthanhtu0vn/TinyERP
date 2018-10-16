import { IAuthorizeStrategy } from "../iauthorizeStrategy";
import { IAuthorizeOption } from "../iauthorizeOption";
import {Promise, PromiseFactory} from "../../../models/promise";
import {MSALUserAgentApplication, IMSALUserAgentApplication} from "./msalUserAgentApplication";
import {IAccquireAccessTokenResponse} from "./iaccquireAccessTokenResponse";
import { AccessTokenResponse } from "./accessTokenResponse";
export class OneDriveAuthorizeStrategy implements IAuthorizeStrategy{
    private option: IAuthorizeOption;
    constructor(option: IAuthorizeOption){
        this.option = option;
    }
    public process(callback: any):Promise{
        let def: Promise=PromiseFactory.create();
        let self=this;
        let clientApplication: IMSALUserAgentApplication =<IMSALUserAgentApplication>new MSALUserAgentApplication(this.option);
        clientApplication.loginPopup([clientApplication.option.scope]).then(function (idToken:string ) {
            clientApplication.acquireTokenSilent([clientApplication.option.scope]).then(function (accessToken:string) {
                self.handleAccessToken(def, accessToken);
            }, function (error: any) {
                clientApplication.acquireTokenPopup([clientApplication.option.scope]).then(function (accessToken: string) {
                    self.handleAccessToken(def, accessToken);
                }, function (error: any) {
                    def.reject(error);
                });
            })
        }, function (error: any) {
            def.reject(error);
        });
        return def;
    }
    private handleAccessToken(def: Promise, accessToken:string){
        def.resolve(<IAccquireAccessTokenResponse>{
            requestDataItem: this.option,
            token: new AccessTokenResponse(accessToken)
        });
    }
}