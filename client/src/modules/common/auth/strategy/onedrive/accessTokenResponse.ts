export class AccessTokenResponse{
    public accessToken:string;
    public expiresIn:number;
    public scope:string;
    public tokenType:string;
    constructor(response: any){
        if(window.Sys.isString(response)){
            this.accessToken = response;
            return;
        }
        this.accessToken = response.access_token;
        this.expiresIn=response.expires_in;
        this.scope=response.scope;
        this.tokenType = response.token_type;
    }
}