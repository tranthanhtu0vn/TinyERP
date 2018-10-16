import { Component, Input, Output, EventEmitter, ElementRef } from "@angular/core";
import { BaseControl } from "../../models/ui";
import { FormInputType, LayoutDirection, DatetimeFormat } from "../../enum";
@Component({
    selector: "form-text-input",
    templateUrl: "src/modules/common/components/form/formTextInput.html"
})
export class FormTextInput extends BaseControl {
    // for date only
    @Input() noLabel: boolean = false;
    @Input() type: string = FormInputType.Text;
    @Input() labelText: string = String.empty;
    @Input() placeHolderText: string = String.empty;
    @Input() validation: Array<string> = [];
    
    @Input() readOnly: boolean = false;
    @Input() copyable: boolean = false;
    @Input() model: string| any;
    @Output() modelChange = new EventEmitter();
    @Input() direction: LayoutDirection = LayoutDirection.Horizontal;
    @Input() focusOnDisplay: boolean=false;
    private elementRef: ElementRef;
    public ENUMS: any = {
        LayoutDirection: LayoutDirection,
        FormInputType: FormInputType
    };
    constructor(elementRef: ElementRef){
        super();
        this.elementRef=elementRef;
    }
    public onReady(){
        if(this.focusOnDisplay===true){
            this.focus();
        }
    }
    public onValueChanged(evt: any) {
        this.modelChange.emit(evt.target.value);
    }
    public focus():void{
        let inputEl= this.elementRef.nativeElement.querySelector("input");
        inputEl.focus();
    }
}