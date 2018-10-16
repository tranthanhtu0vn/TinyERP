import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-approve",
    template: "<icon [enabled]=enabled [showText]=\"showText\" [cls]=\"'icon-approve'\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconApprove extends BaseIcon {
}