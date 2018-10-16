import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-signout",
    template: "<icon [showText]=\"showText\" [cls]=\"'icon-signout'\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconSignOut extends BaseIcon {
}