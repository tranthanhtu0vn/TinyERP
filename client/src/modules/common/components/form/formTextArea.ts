import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BaseControl } from "../../models/ui";
import { LayoutDirection } from "../../enum";
@Component({
    selector: "form-textarea",
    templateUrl: "src/modules/common/components/form/formTextArea.html"
})
export class FormTextArea extends BaseControl {
    @Input() labelText: string = String.empty;
    @Input() placeHolderText: string = String.empty;
    @Input() readOnly: boolean = false;
    @Input() model: any;
    @Output() modelChange = new EventEmitter();
    @Input() direction: LayoutDirection = LayoutDirection.Horizontal;
    public ENUMS: any = {
        LayoutDirection: LayoutDirection
    };
    public onValueChanged(evt: any) {
        this.modelChange.emit(evt.target.value);
    }
}