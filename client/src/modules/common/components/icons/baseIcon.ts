import { Input, Output, EventEmitter, Component } from "@angular/core";
import { BaseControl } from "../../models/ui/baseControl";

@Component({
    selector: "icon",
    templateUrl: "src/modules/common/components/icons/baseIcon.html"
})
export class BaseIcon extends BaseControl {
    @Input() iconUrl:string="";
    @Input() cls: string;
    @Input() text: string;
    @Input() showText: boolean = false;
    @Output() onClicked: EventEmitter<any> = new EventEmitter<any>();
    @Input() enabled: boolean = true;
    public onIconClicked($event: any): void {
        if (!this.enabled) { return; }
        this.onClicked.emit($event);
    }
}