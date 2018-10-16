import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-cancel",
    template: "<icon [showText]=\"showText\" [cls]=\"'icon-cancel'\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconCancel extends BaseIcon {
}