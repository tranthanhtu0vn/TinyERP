import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppCommon, BaseModule, ModuleConfig, ModuleNames } from "@app/common";
import { HrmRoute } from "./hrmRoute";
import ioc from "./_share/config/ioc";
import routes from "./_share/config/routes";
import mainMenus from "./_share/config/mainMenus";

@NgModule({
    imports: [CommonModule, FormsModule, AppCommon, HrmRoute],
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HrmModule extends BaseModule {
    constructor() {
        super(new ModuleConfig(ModuleNames.HRM, ioc, routes, mainMenus));
        this.mainMenus = mainMenus;
    }
}