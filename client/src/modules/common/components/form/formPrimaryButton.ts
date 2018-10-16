import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
    selector: "form-primary-button",
    template: "<form-button [enable]=enable [label]=label [cls]=cls (click)=onButtonClicked($event)></form-button>"
})
export class FormPrimaryButton {
    public cls: string = "btn-primary";
    @Input() enable:boolean=true;
    @Input() label: string = "";
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
    public onButtonClicked(event: any) {
        this.onClick.emit(event);
    }
}