import { Component, Input, Output, EventEmitter } from "@angular/core";
import { PageAction } from "../../models/ui";
@Component({
    selector: "form-dropdown-button",
    templateUrl: "src/modules/common/components/form/formDropdownButton.html"
})
export class FormDropdownButton {
    @Input() label: string = "";
    @Input() items: Array<PageAction> = [];
    public onActionItemClicked(action: any) {
        if (!action || !action.handler) { return; }
        action.handler.call(action.handler);
    }
}