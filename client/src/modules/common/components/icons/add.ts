import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-add",
    template: "<icon [showText]=\"showText\" [cls]=\"'icon-add'\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconAdd extends BaseIcon {
}