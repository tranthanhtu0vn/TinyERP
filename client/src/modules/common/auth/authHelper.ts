import {IAuthService} from "./iauthService";
import {IAccountService}  from "../services/iaccountService";
import {Promise, PromiseFactory} from "../models/promise";
import {IoCNames} from "../ioc/enum";
import {SecurityRoleType, AuthorizationResult} from "./enum";

let authhelper={
    authorize: authorize,
    is: is,
    signout: signout
};
export default authhelper;
function signout(){
    let def=PromiseFactory.create();
    let authService: IAuthService = window.ioc.resolve(IoCNames.IAuthService);
    let accountService: IAccountService = window.ioc.resolve(IoCNames.IAccountService);
    let authToken = authService.getAuthToken();
    accountService.signout(authToken).then((response: any) => {
        authService.removeAuth();
        def.resolve(response);
    });
    return def;

}
function is(role: string):boolean{
    let authService : IAuthService = window.ioc.resolve(IoCNames.IAuthService);
    if( !authService.isAuthorized()){
        return false;
    }
    let profile= authService.getUserProfile();
    return profile.roles.toArray((item: any)=>{
        return item.roleKey;
    })
    .any((roleItem: string)=>{
        return role.toLowerCase()==roleItem.toLowerCase();
    });
}
function authorize(data: any):Promise{
    let def=PromiseFactory.create();
    //if the route did not specified role
    if(!data.roles || !data.roles.length || data.roles.length==0){
        def.resolve(AuthorizationResult.OK);
        return def;
    }
    //if have role specified in route but did not login
    let authService : IAuthService = window.ioc.resolve(IoCNames.IAuthService);
    if( !authService.isAuthorized() && data.roles.any()){
        def.resolve(AuthorizationResult.LOGIN_REQUIRED);
        return def;
    }
    //if login and route have ANY role
    if(data.roles.any((val: any)=>{return val.role == SecurityRoleType.Any;})){
        def.resolve(AuthorizationResult.OK);
        return def;
    }
    let profile= authService.getUserProfile();
    let userRoles:Array<string> = profile.roles.toArray((item: any)=>{
        return {role: item.roleKey, domain: item.domainKey};
    });
    let intersecResult=userRoles.intersect(data.roles, (item: any)=>{return String.format("{0}_{1}", item.domain,item.role);});
    def.resolve(intersecResult.any()?AuthorizationResult.OK:AuthorizationResult.UNAUTHORIZE);
    return def;
}