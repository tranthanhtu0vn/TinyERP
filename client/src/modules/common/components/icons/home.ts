import { Component } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-home",
    template: "<icon [enabled]=enabled [showText]=\"showText\" [cls]=\"'icon-home--white '+ cls\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconHome extends BaseIcon {
}