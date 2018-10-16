import { Component, Input, AfterContentInit } from "@angular/core";
import domHelper from "../helpers/domHelper";
@Component({
    selector: "app-script",
    template: ""
})
export class Script implements AfterContentInit {
    @Input() src: string;
    ngAfterContentInit() {
        domHelper.createScript(this.src);
    }
}