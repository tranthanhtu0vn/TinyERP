import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import helperFacade, { AppCommon } from "@app/common";
import routes from "./_share/config/routes";
import { Staffs } from "./pages/staffs";
let routeConfigs = [
    { path: "", redirectTo: routes.staffs.path, pathMatch: "full" },
    { path: routes.staffs.path, component: Staffs}
];
@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(routeConfigs), AppCommon],
    exports: [RouterModule, Staffs],
    declarations: [Staffs],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HrmRoute { }