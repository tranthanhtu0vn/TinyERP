
import { Component, ElementRef } from "@angular/core";
import { FormTextInput } from "./formTextInput";
import { FormInputType } from "../../enum";
@Component({
    selector: "form-email-input",
    template: `<form-text-input [labelText]=labelText [placeHolderText]=placeHolderText
    [validation]="validation" [type]=type
    [model]=model [readOnly]=readOnly (modelChange)=onModelChange($event)>
</form-text-input>`
})
export class FormEmailInput extends FormTextInput {
    constructor(elementRef: ElementRef) {
        super(elementRef);
        this.type = FormInputType.Email;
    }
    public onModelChange(value: string) {
        this.modelChange.emit(value);
    }
}