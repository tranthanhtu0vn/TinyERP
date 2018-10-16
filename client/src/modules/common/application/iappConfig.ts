import { AppMenuItem, DeploymentMode, IModuleConfigItem } from "@app/common";
// declare interface MediaConfiguration {
//     youtubeUrlPattern: string;
// }
export interface IAppConfig {
    logoUrl: string;
    localization: ILocalization;
    localeUrl: string;
    ioc: Array<any>;
    rootApi: string;
    routes: Array<any>;
    menus: Array<AppMenuItem>;
    defaultUrl: string;
    //media: MediaConfiguration;
    settings: Array<IAppSettingItem>,
    deployment: IDeployment,
    htmlTemplatePath: string,
    themes: Array<ITheme>,
    defaultTheme: IDefaultTheme,
    modules: Array<IModuleConfigItem>
}
export interface IDefaultTheme{
    name: string,
    path:string;
    urlPrefix: string,
    modules: Array<string>
}
export interface ITheme {
    name: string,
    urlPrefix: string,
    isDefault?: boolean,
    modules: Array<any>,
    path?:string
}
interface IDeployment {
    mode: DeploymentMode
}
export interface ILocalization {
    lang: string;
    files: Array<string>;
}