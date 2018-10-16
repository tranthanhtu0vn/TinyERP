import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
    selector: "form-default-link",
    templateUrl: "src/modules/common/components/form/formDefaultLink.html"
})
export class FormDefaultLink {
    @Input() href: string = "#";
    @Input() label: string = "";
    @Input() cls: any = "bt-default";
    @Output() onClick: EventEmitter<any> = new EventEmitter<any>();
    public onClicked(event: any) {
        this.onClick.emit(event);
    }
}