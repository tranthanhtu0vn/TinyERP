import { Directive, Input, ElementRef } from "@angular/core";
import { BaseControl } from "../models/ui/baseControl";

@Directive({
    selector: "[dynamicAttr]"
})

export class DynamicAttr extends BaseControl {
    @Input("dynamicAttr") attrs: Array<any> = [];
    private ui: HTMLElement;
    constructor(element: ElementRef) {
        super();
        this.ui = element.nativeElement;
    }
    protected onReady() {
        let self = this;
        this.attrs.each((item: any) => {
            self.ui.setAttribute(item.name, item.value);
        });
    }
}