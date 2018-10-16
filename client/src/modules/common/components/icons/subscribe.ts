import { Component,Input } from "@angular/core";
import { BaseIcon } from "./baseIcon";

@Component({
    selector: "icon-subscribe",
    template: "<icon [showText]=\"showText\" [iconUrl]=iconUrl [cls]=\"'icon-subscribe '+ cls\" [text]=\"text\" (onClicked)=\"onClicked.emit($event)\"></icon>"
})
export class IconSubscribe extends BaseIcon {
    @Input() iconUrl:string;
}