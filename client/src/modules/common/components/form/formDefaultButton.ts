import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
    selector: "form-default-button",
    template: "<form-button [label]=label [cls]=cls (click)=onButtonClicked($event)></form-button>"
})
export class FormDefaultButton {
    public cls: string = "btn-default";
    @Input() label: string = "";
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
    public onButtonClicked(event: any) {
        this.onClick.emit(event);
    }
}