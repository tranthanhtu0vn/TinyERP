import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { IGenericEventManager } from "../event/ieventManager";
import { OnUnAuthorizedAccess } from "../event/onUnAuthorizedAccess";
import { BaseComponent } from "./ui/baseComponent";
import authHelper from "../auth/authHelper";
import { IoCNames } from "../ioc/enum";
import { AuthorizationResult } from "../auth/enum";
import { OnLoginRequired } from "../auth/onLoginRequired";

export class PageActivator implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
        return new Promise<boolean>((resolve: any, reject: any) => {
            let data = route.data;
            authHelper.authorize(data).then((value: AuthorizationResult) => {
                if (value == AuthorizationResult.OK) {
                    resolve(true);
                    return;
                }
                let eventManager: IGenericEventManager = window.ioc.resolve(IoCNames.IGenericEventManager);
                if (value == AuthorizationResult.LOGIN_REQUIRED) {
                    eventManager.publish(new OnLoginRequired(state.url));
                    reject(String.format("Error: login required for this url:{0}", state.url));
                    return;
                }
                eventManager.publish(new OnUnAuthorizedAccess(state.url));
                reject(String.format("Error: Request to unauthorized resource:{0}", state.url));
            });
        });
    }
}