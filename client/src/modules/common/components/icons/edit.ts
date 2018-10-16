import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-edit",
    template: "<icon [showText]=\"showText\" [cls]=\"'icon-edit'\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconEdit extends BaseIcon {
}