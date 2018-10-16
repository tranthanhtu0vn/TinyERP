import { Component, Input, AfterContentInit } from "@angular/core";
import domHelper from "../helpers/domHelper";
@Component({
    selector: "app-style",
    template: ""
})
export class Style implements AfterContentInit {
    @Input() src: string;
    ngAfterContentInit() {
        domHelper.createStyle(this.src);
    }
}