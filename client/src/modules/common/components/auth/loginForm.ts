import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BaseControl, IAuthService, ISession, SessionVariables } from "@app/common";
import facadeHelper from "@app/common";
import { LoginFormModel } from "./loginFormModel";
import { IoCNames, IGenericEventManager } from "@app/common";
import {OnAccountLoginSuccess} from "../../auth/onAccountLoginSuccess";
import { IAccountService } from "../../services/iaccountService";
@Component({
    selector: "login-form",
    templateUrl: "src/modules/common/components/auth/loginForm.html"
})
export class LoginForm extends BaseControl {
    @Input() showTitle:boolean =true;
    @Input() allowRegister:boolean=true;
    @Input() defaultUrl: string = facadeHelper.appHelper.getConfig().defaultUrl;
    @Output() onRegisterClicked: EventEmitter<any> = new EventEmitter<any>();
    @Input() isCustomLogin:boolean = false;
    @Input() onLoginHandler: any;
    public model: LoginFormModel;
    //to be considered
    @Input() registerUrl: string = facadeHelper.urlHelper.resolve("security.register");
    constructor(route: ActivatedRoute) {
        super();
        this.model = new LoginFormModel();
        //let returnUrl = facadeHelper.urlHelper.decode(route.params["value"].returnUrl);
    }
    public onLoginClicked() {
        if (!this.model.validated()) {
            return;
        }
        let self = this;
        if(this.isCustomLogin && !!this.onLoginHandler){
            this.onLoginHandler(this.model).then((response: any)=>{
                self.onLoginSuccess(response);
            });
            return;
        }
        let accountService: IAccountService = window.ioc.resolve(IoCNames.IAccountService);
        accountService.login(this.model).then((loginResponse: any) => {
            self.onLoginSuccess(loginResponse);
        });
    }
    private onLoginSuccess(loginResponse: any) {
        let authService: IAuthService = window.ioc.resolve(IoCNames.IAuthService);
        authService.setAuth(loginResponse);
        let returnUrl = this.getReturnUrl();
        let eventManager: IGenericEventManager = window.ioc.resolve(IoCNames.IGenericEventManager);
        eventManager.publish(new OnAccountLoginSuccess(loginResponse))
        this.navigate(returnUrl, true);
        // need to redirect back to return url if any, othcmderwise, go to default page
        //console.log(loginResponse);
    }
    public getReturnUrl(): string {
        let session: ISession = window.ioc.resolve(IoCNames.ISession);
        let returnUrl = session.get(SessionVariables.ReturnURL);
        session.remove(SessionVariables.ReturnURL);
        if (String.isNullOrWhiteSpace(returnUrl)) {
            returnUrl = this.defaultUrl;
        }
        return returnUrl;
    }
}