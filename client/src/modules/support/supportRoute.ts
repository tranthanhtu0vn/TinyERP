import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import helperFacade, { AppCommon } from "@app/common";
import routes from "./_share/config/routes";
import { SayHello } from "./pages/sayHello";
let routeConfigs = [
    { path: "", redirectTo: routes.sayHello.path, pathMatch: "full" },
    { path: routes.sayHello.path, component: SayHello}
];
@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(routeConfigs), AppCommon],
    exports: [RouterModule, SayHello],
    declarations: [SayHello],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SupportRoute { }