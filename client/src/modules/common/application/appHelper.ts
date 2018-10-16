import { IAppConfig } from "./iappConfig";
import { IInjector } from "../ioc/iinjector";
import { PromiseFactory } from "../models/promise";
import { IConnector } from "../connectors/iconnector";
import { IoCNames } from "../ioc/enum";
import { IModuleConfigItem } from "../models/imoduleConfigItem";
import {ITheme} from "./iappConfig";
import routerHelper from "../helpers/routerHelper";
class AppHelper {
    public injector: IInjector = null;
    public config: IAppConfig = null;

    public getConfig(): any {
        if (!this.config) {
            throw "Config was not set in appHelper";
        }
        return this.config;
    }
    public setConfig(config: IAppConfig) {
        this.config = config;
    }
    public setInjector(injector: IInjector) {
        this.injector = injector;
    }
    public configHtmlTemplateCache(htmlTemplateFile: string) {
        let def = PromiseFactory.create();
        let connector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        connector.getJSON(htmlTemplateFile).then((templates: any) => {
            window["$templateCache"] = templates;
            def.resolve();
        });
        return def;
    }

    public getModuleConfigsByTheme(theme: string): Array<IModuleConfigItem> {
        if (!this.config.themes.any((item: ITheme) => { return item.name == theme; })) {
            throw String.format("'{0}' theme was not found", theme);
        }

        let themeConfig = this.config.themes.firstOrDefault((item: ITheme) => { return item.name == theme; });
        let themeModules = (themeConfig.modules || [])
            .each((item: any, index: number, arr: Array<any>)=>{
                if(!window.Sys.isString(item)){
                    return;
                }
                arr[index]={name: item, visible: true, isDefault: false};
            })
            .toHashtable((module: any) => { 
                return module.name;
            });
        let moduleConfigs: Array<IModuleConfigItem> = [];
        this.config.modules.each((moduleItem: IModuleConfigItem) => {
            if (!themeModules[moduleItem.name]) { return; }
            let moduleConfig: any = themeModules[moduleItem.name];
            moduleItem.isDefault=moduleConfig.isDefault;
            moduleItem.visible = moduleConfig.visible;
            moduleConfigs.push(moduleItem);
        });
        return moduleConfigs;
    }

    public getThemeByPrefix(theme: string): ITheme {
        if (!this.config.themes.any((item: ITheme) => { return item.name == theme; })) {
            throw String.format("'{0}' theme was not found", theme);
        }

        let themeConfig:ITheme = this.config.themes.firstOrDefault((item: ITheme) => { return item.name == theme; });
        themeConfig.path=routerHelper.getThemeFullPath(themeConfig.name);
        return themeConfig;
    }

}

let appHelper = new AppHelper();
export default appHelper;