import {AuthorizeGrantType} from "../../enum";
import {propertyName} from "../../../decorators/propertyName";
import { DecoratorConst } from "../../../enum";
export class AccessTokenRequest{
    @propertyName("client_id")
    public clientId:string;
    @propertyName("client_secret")
    public secret: string;
    @propertyName("redirect_uri")
    public redirectUri:string;
    @propertyName("code")
    public authCode: string;
    @propertyName("grant_type")
    public grantType:string;
    constructor(clientId:string, secret:string, redirectUri: string, authCode:string){
        this.clientId = clientId;
        this.secret=secret;
        this.redirectUri=redirectUri;
        this.authCode=authCode;
        this.grantType= AuthorizeGrantType.AUTHORIZATION_CODE;
    }
    public toJSON(){
        let result: any ={};
        let metadata = window.Reflect.getMetadata(DecoratorConst.PROPERTY_KEY, this.constructor)||{};
        for(var pro in this){
            if(!this.hasOwnProperty(pro)){continue;}
            let propertyName= !metadata[pro]?pro:metadata[pro];
            result[propertyName]=this[pro];
        }
        return result;
    }
}