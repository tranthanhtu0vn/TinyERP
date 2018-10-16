import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BaseControl } from "../models/ui/baseControl";
import { PanelCommandType } from "../enum";
@Component({
    selector: "panel-command",
    templateUrl: "src/modules/common/components/panelCommand.html"
})
export class PanelCommand extends BaseControl {
    public ENUMS: any = {
        PanelCommandType: PanelCommandType
    };
    @Input() type: string;
    @Input() text: string;
    @Output() onClicked: EventEmitter<any> = new EventEmitter<any>();
}