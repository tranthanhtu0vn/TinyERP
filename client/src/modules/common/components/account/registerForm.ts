import { Component, Input, Output, EventEmitter } from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import { BaseControl} from "../../models/ui/baseControl";
import { RegisterFormModel } from "./registerFormModel";
import {RegistrationMode} from "../../enum";
import {Promise} from "../../models/promise";

@Component({
    selector: "form-register",
    templateUrl: "src/modules/common/components/account/registerForm.html"
})
export class RegisterForm extends BaseControl {
    @Input() title: string;
    @Output() onRegistered: EventEmitter<any> = new EventEmitter<any>();
    @Output() onCancelled: EventEmitter<any> = new EventEmitter<any>();
    @Output() onRegistering: EventEmitter<RegisterFormModel> = new EventEmitter();
    @Input() getInvitatorProfile: (code:string)=> Promise;
    public model: RegisterFormModel;
    public mode: RegistrationMode = RegistrationMode.Default;
    public ENUMS: any={
        RegistrationMode: RegistrationMode
    };
    constructor(activatedRoute: ActivatedRoute) {
        super();
        this.model = new RegisterFormModel();
        let invitorCode = activatedRoute.params["value"].invitationCode;
        if(String.isNullOrWhiteSpace(invitorCode)){return;}
        this.mode=RegistrationMode.Invitation;
        this.model.invitorCode=invitorCode;
    }
    protected onReady():void{
        if(this.mode!=RegistrationMode.Invitation || !this.getInvitatorProfile){return;}
        let self = this;
        this.getInvitatorProfile(this.model.invitorCode).then((invitorProfile: any)=>{
            self.model.invitor = String.format("{0} {1}({2})", invitorProfile.firstName, invitorProfile.lastName, invitorProfile.email);
        });
    }

    // private getInvitatorProfile(invitatorCode: string){
    //     let self = this;
    //     let accountService: IAccountService = window.ioc.resolve(IoCNames.IAccountService);
    //     accountService.getUserProfileByInvitationCode(invitatorCode).then((userProfile: any) => {
    //         self.model.invitor=String.format("{0}({1})",userProfile.fullName, userProfile.email);
    //     });
    // }
    public onRegisterClicked() {
        if (!this.model.validated()) { return; }
        this.onRegistering.emit(this.model);
        // need to set if register student or account
        // let self = this;
        // let accountService: IAccountService = window.ioc.resolve(IoCNames.IAccountService);
        // accountService.registerUser(this.model).then((response: any) => {
        //     self.onRegistered.emit(response);
        // });
    }
    public onCancelClicked() {
        this.onCancelled.emit();
    }
}