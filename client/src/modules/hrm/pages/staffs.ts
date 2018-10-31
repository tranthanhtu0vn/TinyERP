import { Component } from "@angular/core";
import { BasePage, Promise, PromiseFactory, } from "@app/common";
import { StaffsModel } from "./staffsModel";
import { LocalIoCNames } from "../_share/enum";
import { IStaffService } from "../_share/services/istaffService";
@Component({
    templateUrl: "src/modules/hrm/pages/staffs.html"
})
export class Staffs extends BasePage<StaffsModel>{
    public model: StaffsModel;
    constructor() {
        super();
        let self = this;
        self.model = new StaffsModel();
    }
    public fetch(): Promise {
        let def: Promise = PromiseFactory.create();
        let service: IStaffService = window.ioc.resolve(LocalIoCNames.IStaffService);
        service.getStaffs().then(function (searchResult: any) {
            def.resolve(searchResult.items || []);
        });
        return def;
    }
}