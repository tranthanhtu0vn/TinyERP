import { Component } from "@angular/core";
import { BasePage } from "@app/common";
import { IStaffService } from "../_share/services/istaffService";
import {AddNewStaffModel} from "./addNewStaffModel";
import {LocalIoCNames} from "../_share/enum";
import routes from "../_share/config/routes";
@Component({
    templateUrl:"src/modules/hrm/pages/addNewStaff.html"
})
export class AddNewStaff extends BasePage<AddNewStaffModel>{
    public model: AddNewStaffModel= new AddNewStaffModel();
    private currentLanguage:string="en";

    public onChangeLanguageClicked(){
        let newLanguage:string=this.currentLanguage=="en"?"vn":"en";
        this.i18nHelper.reload(newLanguage);
        this.currentLanguage=newLanguage;
    }

    public onSaveClicked():void{
        let service: IStaffService = window.ioc.resolve(LocalIoCNames.IStaffService);
        let self=this;
        service.create(self.model).then(()=>{
            self.navigate(routes.staffs.name);
        });
    }
    public onCancelClicked():void{
        this.navigate(routes.staffs.name);
    }
}