import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-back",
    template: "<icon [showText]=\"showText\" [cls]=\"'icon-back'\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconBack extends BaseIcon {
}