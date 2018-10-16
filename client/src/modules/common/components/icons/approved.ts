import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-approved",
    template: "<icon [enabled]=enabled [showText]=\"showText\" [cls]=\"'icon-approved'\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconApproved extends BaseIcon {
}