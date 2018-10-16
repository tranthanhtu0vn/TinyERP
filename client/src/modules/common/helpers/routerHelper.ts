import { IRouteService } from "../services/irouteService";
//import { IModuleConfig } from "../models/imoduleConfig";
import { IModuleConfigItem } from "../models/imoduleConfigItem";
import { IoCNames } from "../ioc/enum";
import gcHelper from "./gcHelper";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import urlHelper from "./urlHelper";
import { RouteSetting, PatternSetting } from "../enum";
import { ActivatedRouteSnapshot } from "@angular/router";
import { PageActivator, ITheme, IDefaultTheme, BaseTheme } from "@app/common";
import appHelper from "../application/appHelper";
import { IApplicationService } from "../application/iapplicationService";


const MODULE_PATTERN = PatternSetting.ModulePattern;
const THEME_PATH_PATTERN = PatternSetting.ThemePathPattern;
const ROUTE_PARAMETER_PREFIX = RouteSetting.ParameterPrefix;
const ROUTE_SEGTMENT_SEPARATOR = RouteSetting.SegmentSeparator;

let routeHelper = {
    resolveUrl: resolveUrl,
    //getModuleRoute: getModuleRoute,
    navigate: navigate,
    replaceState: replaceState,
    goBack: goBack,
    isCachable: isCachable,
    addPageActivator: addPageActivator,
    getThemeRoutes: getThemeRoutes,
    getDefaultTheme: getDefaultTheme,
    getModuleRoutes: getModuleRoutes,
    getThemeFullPath: getThemeFullPath
};
export default routeHelper;
function addPageActivator(routes: Array<any>): Array<any> {
    if (!routes || routes.length == 0) { return Array.Empty; }
    let result: Array<any> = Array.Empty;
    routes.each((route: any) => {
        if (route.data && route.data.roles) {
            route.canActivate = route.canActivate || [];
            route.canActivate.push(PageActivator);
        }
        result.push(route);
    });
    return result;
}
function isCachable(route: ActivatedRouteSnapshot) {
    return route && route.data && route.data.cachable === false ? false : true;
}
function goBack() {
    window.history.back();
}
function replaceState(newState: string) {
    let location: Location = window.ioc.resolve(Location);
    location.replaceState(newState);
}
/*options:{
    name: name of route as registered in route config for each module.
    path: url pattern mapped to that name of url, we can have multiple parameters in each route pattern
    customName....: this is dynamic name, the same with parameter in url,

}*/
function navigate(options: any, isUrlPath: boolean = false, openInNewWindow: boolean = false) {
    if (openInNewWindow == true) {
        let urlOption = typeof options != "string" ? options : { name: options };
        let url: string = resolveUrl(urlOption);
        return window.open(url, "_blank");
    }
    let router: Router = window.ioc.resolve(Router);
    /*options is a string of url*/
    if (isUrlPath === true) {
        router.navigate([options]);
        return;
    }
    /*it should return to string (name of route) or object as route option*/
    if (typeof options == "function") {
        let result = options();
        navigate(result);
        return;
    }

    /*name of route
    convert to {name: route name} format
    */
    options = typeof options == "string" ? { name: options } : options;
    // if (typeof options == "string") {
    //     let routeName = options;
    //     options = { name: routeName };
    //     navigate(options);
    //     return;
    // }
    /*valid route option object*/
    let url: string = resolveUrl(options);
    console.log("Navigating to:", url);
    router.navigate([url]);
}
/*
 options:{
     name:meaningful name of route in format <module name>.<sub feature name>.<page name>, such as: security.contentType.addNewContentType,
     param1: name of parameter, such as id
 } 
 options={name:"security.contentType.editContentType", id: 1} can be resolved as "/security/contentTypes/editContentType/1". This belong to the path pattern of each module. Please have  alook for more default in <module>Module.ts file
 */
function resolveUrl(options: any): string {
    if (!options || (window.Sys.isObject(options) && String.isNullOrWhiteSpace(options.name))) {
        throw "Please specify valid value for options parameter.";
    }
    //let name = window.Sys.isString(options) ? options : options.name;
    options = window.Sys.isString(options) ? {name: options} : options;
    let name=options.name;
    let urlPath=options.path;
    gcHelper.collect(options, "name");
    gcHelper.collect(options, "path");
    if(String.isNullOrWhiteSpace(urlPath)){
        let routeService: IRouteService = window.ioc.resolve(IoCNames.IRouteService);
        let route = routeService.getByRouteName(name);
        urlPath=route.path;
    }
    if (urlHelper.isFixedUrl(urlPath)) {
        return resolveUrlFromPath(urlPath, options);
    }
    let appService: IApplicationService = window.ioc.resolve(IoCNames.IApplicationService);
    let currentTheme: BaseTheme = appService.getCurrentTheme();
    let themePrefix = !!currentTheme?currentTheme.urlPrefix:String.empty;
    let path = String.format("{0}{1}{2}{1}{3}", themePrefix, ROUTE_SEGTMENT_SEPARATOR, name.split(".")[0], urlPath);
    //let path = route.path;
    return resolveUrlFromPath(path, options);
}
function resolveUrlFromPath(path: string, options: any): string {
    for (let pro in options) {
        if (!options.hasOwnProperty(pro)) { continue; }
        let value: string = urlHelper.encode(options[pro]);
        path = path.replace(ROUTE_PARAMETER_PREFIX + pro, value);
    }
    return path;
    // let segments = path.split(ROUTE_SEGTMENT_SEPARATOR);
    // for (let itemIndex = 0; itemIndex < segments.length; itemIndex++) {
    //     if (!segments[itemIndex].startsWith(ROUTE_PARAMETER_PREFIX)) { continue; }
    //     let parameterName = segments[itemIndex].replace(ROUTE_PARAMETER_PREFIX, "");
    //     if (!options[parameterName] || String.isNullOrWhiteSpace(options[parameterName])) {
    //         throw String.format("\Missing value for \'{0}\' parameter when resolve \'{1}\' path.", segments[itemIndex], path);
    //     }
    //     segments[itemIndex] = options[parameterName];
    // }
    // return segments.toString(ROUTE_SEGTMENT_SEPARATOR);
}
// function getModuleRoute(modules: Array<IModuleConfigItem>) {
//     let routes: Array<any> = [];
//     let defaultModule: IModuleConfigItem = null;
//     modules.forEach((module: IModuleConfigItem) => {
//         routes.push({ path: module.urlPrefix, loadChildren: getModuleFullPath(module.path) });
//         if (module.isDefault && module.isDefault == true) {
//             defaultModule = module;
//         }
//     });
//     if (defaultModule != null) {
//         routes.push({ path: "", redirectTo: defaultModule.urlPrefix, pathMatch: "full" });
//     }
//     return routes;
// }

function getModuleRoutes(theme: string) {
    let routes: Array<any> = [];
    let modules: Array<IModuleConfigItem> = appHelper.getModuleConfigsByTheme(theme);
    let defaultModule: IModuleConfigItem = null;
    modules.forEach((module: IModuleConfigItem) => {
        routes.push({ path: module.urlPrefix, loadChildren: getModuleFullPath(module.path) });
        if (module.isDefault && module.isDefault == true) {
            defaultModule = module;
        }
    });
    if (defaultModule != null) {
        routes.push({ path: "", redirectTo: defaultModule.urlPrefix, pathMatch: "full" });
    }
    return routes;
}

function getDefaultTheme(themes: Array<ITheme>): IDefaultTheme {
    if (!Array.any(themes)) {
        throw String.format("There was no themes");
    }
    let defaultTheme: any = themes.firstOrDefault((item: ITheme) => {
        return item.isDefault === true;
    });
    if (!defaultTheme) {
        throw String.format("There was not default theme. Please set one.");
    }
    defaultTheme.path = getThemeFullPath(defaultTheme.name);
    return defaultTheme;
}
function getThemeRoutes(themes: Array<ITheme>) {
    let routes: Array<any> = [];
    let defaultTheme: ITheme = null;
    themes.forEach((theme: ITheme) => {
        routes.push({ path: theme.urlPrefix, loadChildren: getThemeFullPath(theme.name), data: { modules: theme.modules } });
        if (theme.isDefault && theme.isDefault == true) {
            defaultTheme = theme;
        }
    });
    if (defaultTheme != null) {
        routes.push({ path: "", redirectTo: defaultTheme.urlPrefix, pathMatch: "full", data: { modules: defaultTheme.modules } });
    }
    return routes;
}

function getThemeFullPath(name: string) {
    return String.format(THEME_PATH_PATTERN, name, String.toPascalCase(name))
}

function getModuleFullPath(moduleName: string) {
    return String.format(MODULE_PATTERN, moduleName, String.toPascalCase(moduleName))
}