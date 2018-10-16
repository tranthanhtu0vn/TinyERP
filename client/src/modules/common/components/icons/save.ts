import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-save",
    template: "<icon [enabled]=enabled [showText]=\"showText\" [cls]=\"'icon-save'\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconSave extends BaseIcon {
}