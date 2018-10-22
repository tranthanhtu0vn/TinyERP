import { IAppConfig, LANG, DeploymentMode, AppThemeType } from "@app/common";
import helperFacade from "@app/common";
import modules from "./modules";
import ioc from "./ioc";
import menus from "./menus";
import settings from "./settings";
import themes from "./themes";
let appConfig: IAppConfig = {
    modules: modules,
    logoUrl: "/src/resources/images/baby_book.png",
    menus: menus,
    localization: {
        lang: LANG.EN,
        /* files: [Locale.Common, Locale.Setting, Locale.Security] */
        files: helperFacade.moduleHelper.getModuleLocales(modules).merge([AppThemeType.Default])
    },
    localeUrl: "/src/resources/locales/",
    rootApi: "http://api.tinyerp.com/api/",
    ioc: ioc,
    routes: helperFacade.routeHelper.getThemeRoutes(themes),
    defaultUrl: "/dashboard",
    settings: settings,
    deployment: {
        mode: DeploymentMode.DEV /*use DeploymentMode.PROD in production deployment*/
    },
    htmlTemplatePath: "src/resources/html-templates.json",
    themes: themes,
    defaultTheme: helperFacade.routeHelper.getDefaultTheme(themes)
}
export default appConfig