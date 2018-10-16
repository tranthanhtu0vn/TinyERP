import { Router, ActivatedRoute } from "@angular/router";
import { BaseComponent } from "./baseComponent";

import { ComponentType } from "./enum";
export class BasePage<Model> extends BaseComponent {
    //protected router: Router;
    protected model: Model;
    constructor() {
        super(ComponentType.Page)
        //this.router = window.ioc.resolve(Router);
    }
    protected getParam(name: string): string {
        let router: Router = window.ioc.resolve(Router);
        let currentRoute = router.routerState.root;
        console.log("currentRoute", currentRoute);
        let value: string = "";
        if (currentRoute && currentRoute.params && currentRoute.params["value"] && currentRoute.params["value"][name]) {
            value = currentRoute.params["value"][name];
        }
        return value;
    }
    protected onLoad(): void { }
}