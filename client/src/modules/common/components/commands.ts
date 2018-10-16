import { Component } from "@angular/core";
import { BaseControl } from "@app/common";

@Component({
    selector: "commands",
    template: "<ng-content></ng-content>"
})
export class Commands extends BaseControl { }