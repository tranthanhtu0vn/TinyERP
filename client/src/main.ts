/// <reference path="extension.d.ts" />
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { DeploymentMode } from "@app/common";
import helperFacade from "@app/common";
// import appConfig from "./apps/learning/config/appConfig";
// import { Application } from "./apps/learning/app";

import { RESOURCE_CACHE_PROVIDER } from '@angular/platform-browser-dynamic';
import { COMPILER_OPTIONS } from '@angular/core';
let startup = {
    start: start
};
export default startup;
function start(htmlTemplates: any, ApplictionConstructor: any, appConfig: any) {
    // let appConfig = await import(String.format("./apps/{0}/config/appConfig", window.APP_NAME));
    // let Application = await import(String.format("./apps/{0}/config/appConfig", window.APP_NAME));
    helperFacade.iocHelper.configIoC(appConfig).then(() => {
        helperFacade.appHelper.setConfig(appConfig);
        if (appConfig.deployment.mode == DeploymentMode.PROD) {
            helperFacade.templateHelper.configCacheTemplates(htmlTemplates.default ? htmlTemplates.default : htmlTemplates);
            platformBrowserDynamic([{
                provide: COMPILER_OPTIONS,
                useValue: { providers: [RESOURCE_CACHE_PROVIDER] },
                multi: true
            }]).bootstrapModule(ApplictionConstructor);
            return;
        }
        if (appConfig.deployment.mode == DeploymentMode.DEV) {
            platformBrowserDynamic().bootstrapModule(ApplictionConstructor);
        }
    });
}