import { Component } from "@angular/core";
import { BasePage, Promise, PromiseFactory, PageAction, } from "@app/common";
import { StaffsModel } from "./staffsModel";
import { LocalIoCNames } from "../_share/enum";
import { IStaffService } from "../_share/services/istaffService";
import routes from "../_share/config/routes";
@Component({
    templateUrl: "src/modules/hrm/pages/staffs.html"
})
export class Staffs extends BasePage<StaffsModel>{
    public model: StaffsModel;
    
    constructor() {
        super();
        let self = this;
        self.model = new StaffsModel(this.i18n);
        self.model.addAction(new PageAction("hrm.staffs.addNewStaff",()=>{self.onAddNewStaffClicked();}));
    }
   
    private onAddNewStaffClicked():void{
        this.navigate(routes.addNewStaff.name);
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