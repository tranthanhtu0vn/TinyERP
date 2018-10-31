import { ModuleNames, IModuleConfigItem } from "@app/common";
let modules: Array<IModuleConfigItem> = [
    { name: ModuleNames.Support, urlPrefix: ModuleNames.Support, path: ModuleNames.Support},
    { name: ModuleNames.HRM, urlPrefix: ModuleNames.HRM, path: ModuleNames.HRM}
];
export default modules;