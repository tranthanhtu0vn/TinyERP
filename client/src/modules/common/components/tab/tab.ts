import { Input, Output, Component, EventEmitter, ContentChild, ViewContainerRef, ViewChild } from "@angular/core";
import { BaseControl, ItemAlign } from "@app/common";
import { TabState } from "./enum";
@Component({
    selector: "tab",
    templateUrl: "src/modules/common/components/tab/tab.html"
})
export class Tab extends BaseControl {
    @Input() cls: string = "tab";
    @Input() title: string;
    @Output() onRendered: EventEmitter<any> = new EventEmitter<any>();
    @Input() commandAlign: ItemAlign = ItemAlign.Left;
    @Input() enable: boolean = true;
    @Input() visible: boolean = true;
    public state: TabState = TabState.InActive;
    public ENUMS: any = {
        TabState: TabState,
        ItemAlign: ItemAlign
    };
    public show() {
        this.state = TabState.Active;
    }
    public hide() {
        this.state = TabState.InActive;
    }
}