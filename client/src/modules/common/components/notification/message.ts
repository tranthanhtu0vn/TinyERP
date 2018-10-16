import { Component, Input } from "@angular/core";
import { BaseControl } from "../../models/ui/baseControl";
import { MessageType } from "../../enum";
@Component({
    selector: "message",
    templateUrl: "src/modules/common/components/notification/message.html"
})
export class Message extends BaseControl {
    @Input() type: MessageType = MessageType.Infomation;
    @Input() message: string;
    @Input() title: string;
    public ENUMS: any = {
        MessageType: MessageType
    };
}