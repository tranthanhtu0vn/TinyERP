import { NgModule, ComponentFactoryResolver, Injector } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, ActivatedRoute, Routes, Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { AppCommon,OnUnAuthorizedAccess, AppThemeType, BaseTheme, IGenericEventManager,OnLoginRequired, IoCNames, OnProfileDetailRequired} from "@app/common";
import { DefaultLayout } from "./defaultLayout";
import { MainMenu } from "./_share/components/mainMenu";
import facadeHelper from "@app/common";
import {EventFacade} from "./eventFacade";
import {IconAvatar} from "./_share/components/iconAvatar";
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(facadeHelper.routeHelper.getModuleRoutes(AppThemeType.Default)),
        AppCommon],
    declarations: [DefaultLayout, MainMenu, IconAvatar],
    exports: [DefaultLayout],
    entryComponents: [DefaultLayout]
})
export class DefaultTheme extends BaseTheme {
    private resolver: ComponentFactoryResolver;
    constructor(resolver: ComponentFactoryResolver) {
        super();
        this.resolver = resolver;
    }

    protected registerEvents():void{
        let eventManager: IGenericEventManager = window.ioc.resolve(IoCNames.IGenericEventManager);
        let onLoginRequired: OnLoginRequired = new OnLoginRequired();
        eventManager.subscribe(onLoginRequired, EventFacade.onLoginRequired);

        let onUnAuthorizedAccess: OnUnAuthorizedAccess = new OnUnAuthorizedAccess();
        eventManager.subscribe(onUnAuthorizedAccess, EventFacade.onUnAuthorizedAccess);

         eventManager.subscribe(new OnProfileDetailRequired(), EventFacade.onProfileDetailRequired);
    }
    
    public getBootstrapComponent(): any {
        let bootstrapComp = this.resolver.resolveComponentFactory(DefaultLayout);
        return bootstrapComp;
    }
}