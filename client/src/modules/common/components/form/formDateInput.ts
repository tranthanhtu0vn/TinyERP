
import { Component, ElementRef } from "@angular/core";
import { FormTextInput } from "./formTextInput";
import { FormInputType } from "../../enum";
@Component({
    selector: "form-date-input",
    template: `<form-text-input [id]=id [labelText]=labelText [placeHolderText]=placeHolderText
    [validation]="validation" [type]=type
    [model]=model [format]=format [readOnly]=readOnly (modelChange)=onModelChange($event)>
</form-text-input>`
})
export class FormDateInput extends FormTextInput {
    constructor(elementRef: ElementRef) {
        super(elementRef);
        this.type = FormInputType.Date;
    }
    public onReady():void{
        super.onReady();
        this.initControl();
    }
    private initControl(){
        let self=this;
        window.jQuery('#'+ this.id).daterangepicker({
            singleDatePicker: true,
            calender_style: "picker_2"
          }, function(start: any, end: any, label: any) {
              self.onModelChange(start);
            //console.log(start.toISOString(), end.toISOString(), label);
          });
    }
    public onModelChange(value: any) {
        this.modelChange.emit(value);
    }
}