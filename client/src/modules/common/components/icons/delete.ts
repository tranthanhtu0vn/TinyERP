import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-delete",
    template: "<icon [showText]=\"showText\" [cls]=\"'icon-delete'\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconDelete extends BaseIcon {
}