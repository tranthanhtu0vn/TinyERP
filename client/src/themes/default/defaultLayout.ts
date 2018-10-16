import { Component } from "@angular/core";
import { OnAccountLoginSuccess, IAuthService, OnLoginRequired, IGenericEventManager, AppThemeType, AppMenuItem, BaseLayout, ApplicationEventType, OnModuleLoaded, IEventManager, IoCNames, LayoutPosition, OnUnAuthorizedAccess } from "@app/common";
import helperFacade from "@app/common";
import {DefaultThemeDisplayMode} from "./_share/models/enum";
@Component({
    selector: "layout",
    templateUrl: "src/themes/default/defaultLayout.html"
})
export class DefaultLayout extends BaseLayout {
    public ENUMS:any={
        LayoutPosition: LayoutPosition,
        DefaultThemeDisplayMode: DefaultThemeDisplayMode
    };
    private onLoginRequiredSubcription: any;
    public authMode:string = DefaultThemeDisplayMode.UNAUTHORIZED;
    public menuItems: Array<AppMenuItem> = [];
    protected onReady(): void {
        super.onReady();
        window.jQuery("body").addClass("nav-md");

        let authService: IAuthService = window.ioc.resolve(IoCNames.IAuthService);
        this.authMode = authService.isAuthorized()?DefaultThemeDisplayMode.AUTHORIZED: DefaultThemeDisplayMode.UNAUTHORIZED;
    }
    protected registerEvents(){
        let self = this;
        let eventManager: IEventManager = window.ioc.resolve(IoCNames.IEventManager);
        eventManager.subscribe(ApplicationEventType.OnModuleLoaded, (ev: OnModuleLoaded) => { self.onModuleLoaded(ev); });

        let genericEventManager: IGenericEventManager = window.ioc.resolve(IoCNames.IGenericEventManager);
        this.onLoginRequiredSubcription = genericEventManager.subscribe(new OnLoginRequired(), ()=>{self.onLoginRequired();});

        genericEventManager.subscribe(new OnUnAuthorizedAccess(), ()=>{self.onUnAuthorizedAccess();});

        genericEventManager.subscribe(new OnAccountLoginSuccess(), ()=>{self.onLoginSuccess();});
    }
    private onUnAuthorizedAccess(){
        this.authMode=DefaultThemeDisplayMode.UNAUTHORIZED;
    }
    private onLoginSuccess():void{
        this.authMode=DefaultThemeDisplayMode.AUTHORIZED;
    }
    private onLoginRequired(){
        this.authMode=DefaultThemeDisplayMode.UNAUTHORIZED;
    }
    protected onBeforeReady() {
        super.onBeforeReady();
        let modules: Array<any> = helperFacade.themeHelper.getModuleAsIcons(AppThemeType.Default);
        let mainMenus: Array<AppMenuItem> = [];
        modules.each((item: any) => {
            mainMenus.push(new AppMenuItem(item.text, item.url, item.cls));
        });
        this.menuItems = mainMenus;
    }
    private onModuleLoaded(ev: OnModuleLoaded): void {
        let moduleMenuItem: AppMenuItem = this.menuItems.firstOrDefault((item: AppMenuItem) => { return item.text == ev.name });
        ///appropriated module was not in config of theme
        if (!moduleMenuItem) {
            return;
        }
        moduleMenuItem.subMenuItems = this.getSubMenuItems(ev.mainMenus);
        moduleMenuItem.text = ev.name;
    }
    private getSubMenuItems(items: Array<any>): Array<AppMenuItem> {
        let menus: Array<AppMenuItem> = [];
        if (!items || items.length == 0) { return menus; }
        items.each((item: any) => {
            menus.push(new AppMenuItem(item.text, item.url, item.cls));
        });
        return menus;
    }
    protected onUnload() {
        super.onUnload();
        if(this.onLoginRequiredSubcription){
            this.onLoginRequiredSubcription.unsubscribe();
        }
        window.jQuery("body").removeClass("nav-md");
    }
}
