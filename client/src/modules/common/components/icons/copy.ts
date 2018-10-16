import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-copy",
    template: "<icon [showText]=\"showText\" [cls]=\"'icon-copy'\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconCopy extends BaseIcon {
}