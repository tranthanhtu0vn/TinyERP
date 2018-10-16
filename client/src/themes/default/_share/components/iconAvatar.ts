import { Component } from "@angular/core";
import { BaseControl, IoCNames, IGenericEventManager, OnLoginRequired, IAuthService, OnAccountLoginSuccess, OnProfileAvatarChanged, OnProfileDetailRequired } from "@app/common";
import facadeHelper from "@app/common";

@Component({
    selector: "icon-avatar",
    templateUrl: "src/themes/default/_share/components/iconAvatar.html"
})
export class IconAvatar extends BaseControl {
    private userProfile: IUserProfile;
    public isAuthenticated:boolean = false;
    public avatarUrl:string;
    constructor(){
        super();
        this.loadAuthInfo();
    }
    private loadAuthInfo():void{
        let authService: IAuthService = window.ioc.resolve(IoCNames.IAuthService);
        this.isAuthenticated = authService.isAuthorized();
        if(!this.isAuthenticated){ return; }
        this.userProfile=authService.getUserProfile();
        this.setDefaultAvatarIfEmpty(this.userProfile.avatar);
    }
    protected onReady() {
        let self = this;
        let eventManager: IGenericEventManager = window.ioc.resolve(IoCNames.IGenericEventManager);
        eventManager.subscribe(new OnAccountLoginSuccess(), (ev: OnAccountLoginSuccess) => {
            self.onAccountLoginSuccess(ev);
        });

        eventManager.subscribe(new OnProfileAvatarChanged(), (ev: OnProfileAvatarChanged) => {
            self.onProfileAvatarChanged(ev);
        });
    }
    private setDefaultAvatarIfEmpty(avatar: string): void {
        this.avatarUrl = String.isNullOrWhiteSpace(avatar)?
            facadeHelper.settingHelper.getNoPhotoUri():
            facadeHelper.mediaHelper.resolveUrl(avatar);
    }
    private onAccountLoginSuccess(userProfile: any): void {
        this.isAuthenticated = true;
        this.userProfile = userProfile;
        this.setDefaultAvatarIfEmpty(this.userProfile.avatar);
    }
    private onProfileAvatarChanged(ev: OnProfileAvatarChanged): void {
        this.setDefaultAvatarIfEmpty(ev.avatar);
    }
    public onLoginClicked() {
        let event = new OnLoginRequired("");
        let eventManager: IGenericEventManager = window.ioc.resolve(IoCNames.IGenericEventManager);
        eventManager.publish<OnLoginRequired>(event);
    }
    public onProfileClicked() {
        let profileDetailRequired: OnProfileDetailRequired =new OnProfileDetailRequired(this.userProfile.id);
        let eventManager: IGenericEventManager = window.ioc.resolve(IoCNames.IGenericEventManager);
        eventManager.publish<OnProfileDetailRequired>(profileDetailRequired);
    }
}