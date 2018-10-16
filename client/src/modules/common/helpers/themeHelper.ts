import { IModuleConfigItem } from "../models/imoduleConfigItem";
import {IoCNames} from "../ioc/enum";
import {IApplicationService} from "../application/iapplicationService";
import { RouteSetting } from "../enum";
import {BaseTheme} from "../models/ui/baseTheme";
import appHelper from "../application/appHelper";
let themeHelper={
    getModuleAsIcons: getModuleAsIcons
};
export default themeHelper;
function toAbsolutionUrl(modulePrefix:string):string{
    let appService: IApplicationService = window.ioc.resolve(IoCNames.IApplicationService);
    let currentTheme: BaseTheme = appService.getCurrentTheme();
    let themePrefix = !!currentTheme?currentTheme.urlPrefix:String.empty;
    return String.format("{0}{1}{0}{2}", RouteSetting.SegmentSeparator, themePrefix, modulePrefix);
}
function getModuleAsIcons(theme: string): Array<any>{
    let routes: Array<any> = [];
    let modules: Array<IModuleConfigItem> = appHelper.getModuleConfigsByTheme(theme);
    modules.forEach((module: IModuleConfigItem) => {
        if(module.visible===false){return;}
        routes.push({ text: module.name, url: toAbsolutionUrl(module.urlPrefix), cls:"icon-module-"+module.urlPrefix});
    });
    return routes;
}