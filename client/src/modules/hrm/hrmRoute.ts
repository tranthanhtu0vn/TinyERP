import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { AppCommon } from "@app/common";
import routes from "./_share/config/routes";
import { Staffs } from "./pages/staffs";
import {AddNewStaff} from "./pages/addNewStaff";
let routeConfigs = [
    { path: "", redirectTo: routes.staffs.path, pathMatch: "full" },
    { path: routes.staffs.path, component: Staffs},
    { path: routes.addNewStaff.path, component: AddNewStaff}
];
@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(routeConfigs), AppCommon],
    exports: [RouterModule, Staffs],
    declarations: [Staffs, AddNewStaff],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HrmRoute { }