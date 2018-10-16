import { Component, Input } from "@angular/core";
import { BaseControl } from "../../models/ui/baseControl";
import { AlertType } from "../../enum";

@Component({
    selector: "alert",
    templateUrl: "src/modules/common/components/notification/alert.html"
})
export class Alert extends BaseControl {
    @Input() cls: string;
    @Input() type: AlertType = AlertType.Primary;
    public ENUMS: any = {
        AlertType: AlertType
    };
}