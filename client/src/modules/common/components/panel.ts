import { Component, Input, ContentChildren, QueryList, ViewChild, ViewContainerRef, Output, EventEmitter } from "@angular/core";
import { BaseControl } from "../models/ui/baseControl";
import { PanelCommand } from "./panelCommand";
import { LayoutPosition } from "../enum";

@Component({
    selector: "panel",
    templateUrl: "src/modules/common/components/panel.html"
})
export class Panel extends BaseControl {
    @Input() cls: string = "panel";
    @Input() title: string = "";
    @Input() commandPosition: LayoutPosition = LayoutPosition.Top;
    @Output() onCommandClicked: EventEmitter<any> = new EventEmitter<any>();
    @ContentChildren(PanelCommand) commands: QueryList<PanelCommand>;
    public ENUMS: any = {
        LayoutPosition: LayoutPosition
    };
    protected onReady() {
        if (!this.commands || this.commands.length == 0) { return; }
        let self = this;
        this.commands.forEach((command: PanelCommand) => {
            command.onClicked.subscribe((ev: any) => {
                self.onCommandClicked.emit({ type: command.type });
            });
        });
    }
}