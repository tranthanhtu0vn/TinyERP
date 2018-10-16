import { BaseControl } from "../models/ui";
import { Component, Input, Output } from "@angular/core";
import {DialogSize}  from "../enum";
@Component({
    selector:"form-dialog",
    templateUrl:"src/modules/common/components/formDialog.html"
})
export class FormDialog extends BaseControl{
    @Input() title:string;
    @Input() size: DialogSize= DialogSize.Small;
    public ENUMS:any={
        DialogSize : DialogSize
    };
    public show():void{
        window.jQuery("#dialog_"+ this.id).modal({
            keyboard:true,
            focus:true,
            show:true
        });
    }

    public hide():void{
        window.jQuery("#dialog_"+ this.id).modal("hide");
    }
}