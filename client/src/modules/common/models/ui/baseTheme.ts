import {ApplicationRef} from "@angular/core";
import { ComponentType } from "./enum";
import { BaseComponent } from "./baseComponent";
import {IApplicationService} from "../../application/iapplicationService";
import {IoCNames} from "@app/common";
export class BaseTheme extends BaseComponent {
    public urlPrefix:string;
    constructor() {
        super(ComponentType.Theme)
    }
    public setUrlPrefix(urlPrefix:string):void{
        this.urlPrefix=urlPrefix;
    }
    public onLoading(app: ApplicationRef):void{
        let appService: IApplicationService = window.ioc.resolve(IoCNames.IApplicationService);
        appService.setCurrentTheme(this);
    }
    public onLoaded(app: ApplicationRef):void{
    }
}