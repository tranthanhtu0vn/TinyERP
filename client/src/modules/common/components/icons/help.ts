import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-help",
    template: "<icon [showText]=\"showText\" [cls]=\"'icon-help '+ cls\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconHelp extends BaseIcon {
}