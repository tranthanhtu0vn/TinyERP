import { Directive, ElementRef, Input, Output, EventEmitter } from "@angular/core";
import { BaseControl } from "@app/common";

@Directive({
    selector: "[sortable]"
})
export class Sortable extends BaseControl {
    @Input("sortable-selector") selector: string = "li";
    @Output("sortable-onStop") onStop: EventEmitter<any> = new EventEmitter<any>();
    @Input("sortable-enable") enable: boolean = false;
    @Input("sortable-container") container: string = "ul";
    public static placeHolder: string = "ui-sortable__placeholder";
    private ui: HTMLElement;
    private className: string = "ui-sortable";
    constructor(element: ElementRef) {
        super();
        this.ui = element.nativeElement;
    }
    private onEnableChanged(newVal: boolean) {
        if (newVal === true) {
            this.enableSort();
            return;
        }
        this.disableSort();
    }
    private enableSort() {
        let self = this;
        window.jQuery(this.ui).sortable({
            items: this.selector,
            placeholder: Sortable.placeHolder,
            connectWith: self.container,
            stop: (ev: any, ui: any) => {
                self.onStop.emit({ event: ev, element: ui });
            }
        });
        window.jQuery(this.ui).find(self.selector).addClass(SortOption.cls);
        this.logger.info("Sortable control was initialized.");
    }
    private disableSort() {
        try{
        window.jQuery(this.ui).sortable("disable");
        window.jQuery(this.ui).find(this.selector).removeClass(this.className);
        this.logger.info("Sortable control was removed.");
        }catch(e){
            this.logger.error(e);
        }
    }
}
class SortOption {
    public selector: string = "li";
    public container: string = "";
    public data: any;
    public onStop: (data: any) => void;
    public static placeHolder: string = "ui-sortable__placeholder";
    public static cls: string = "ui-sortable";
    constructor(options: any | string) {
        if (!options) { return; }
        if (typeof options == "string") {
            this.selector = options;
            return;
        }
        this.selector = options.selector;
        this.container = options.container;
        this.data = options.data;
        this.onStop = options.onStop;
    }
}