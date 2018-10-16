import {OnLoginRequired, OnUnAuthorizedAccess, ISession, IoCNames, SessionVariables, OnProfileDetailRequired} from "@app/common";
import helperFacade from "@app/common";
export class EventFacade{
    public static onLoginRequired(ev: OnLoginRequired){
        let session: ISession = window.ioc.resolve(IoCNames.ISession);
        session.set(SessionVariables.ReturnURL, ev.returnUrl);
        //helperFacade.routeHelper.navigate("learningDashboard/courses/import", true);
        let loginUrl: string = helperFacade.settingHelper.getLoginUri();
        helperFacade.routeHelper.navigate(loginUrl, true);
    }
    public static onUnAuthorizedAccess(ev: OnUnAuthorizedAccess){
        let loginUrl: string = helperFacade.settingHelper.getUnauthorizeAccessUri();
        helperFacade.routeHelper.navigate(loginUrl, true);
    }
    
    public static onProfileDetailRequired(ev: OnProfileDetailRequired):void{
        let userDetailUri: string = helperFacade.settingHelper.getUserDetailUri(ev.userId);
        helperFacade.routeHelper.navigate(userDetailUri, true);
    }
}