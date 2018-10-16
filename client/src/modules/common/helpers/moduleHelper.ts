import {ModuleNames} from "../enum";
let moduleHelper = {
    getModuleLocales: getModuleLocales
};
export default moduleHelper;
function getModuleLocales(modules: Array<any>) {
    let locales: Array<string> = [ModuleNames.Common];
    modules.forEach((item: any) => {
        locales.push(item.name);
    });
    return locales;
}