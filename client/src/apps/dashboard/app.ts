import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ApplicationRef, Component, NgModuleFactoryLoader, SystemJsNgModuleLoader, Injector } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import {PageActivator, BaseApplication, AppCommon} from "@app/common";
import appConfig from "./config/appConfig";

@NgModule({
    imports: [
        AppCommon,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appConfig.routes, { enableTracing: false })
    ],
    providers: [
        PageActivator,
        { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Application extends BaseApplication {
    constructor(ref: ApplicationRef, injector: Injector, loader: NgModuleFactoryLoader) {
        super(appConfig,  ref, loader, injector);
    }
}

