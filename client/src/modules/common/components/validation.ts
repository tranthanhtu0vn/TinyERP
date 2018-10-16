import { ElementRef, Input, Directive } from "@angular/core";
import { IEventManager } from "../event";
import {BaseControl} from "../models/ui/baseControl";
import { IResourceManager } from "../iresourceManager";
import { ValidationEvent, ValidationMode, ValidationException } from "../exception";
import { IoCNames } from "../ioc/enum";
@Directive({
    selector: "[validation]"
})
export class Validation extends BaseControl {
    private el: HTMLInputElement;
    private errorKeys: Array<string>;
    @Input("validation") set keys(keys: Array<string>) {
        this.errorKeys = keys;
    }
    private successSubscription:any;
    private failSubscription:any;
    constructor(ui: ElementRef) {
        super();
        let self: Validation = this;
        this.el = ui.nativeElement;
        let eventManager: IEventManager = window.ioc.resolve(IoCNames.IEventManager);
        this.failSubscription = eventManager.subscribe(ValidationEvent.ValidationFail, (error: ValidationException) => self.onValidationFailed(error));
        this.successSubscription = eventManager.subscribe(ValidationEvent.ValidationSuccess, () => self.onValidationSuccess());
    }
    private onValidationSuccess():void{
        this.hideError();
    }
    private onValidationFailed(exception: ValidationException) {
        let errors: Array<any> = exception.errors;
        if (!errors || errors.length === 0) {
            this.hideError();
            return;
        }
        let self: Validation = this;
        let error = errors.firstOrDefault(function (item: any) {
            return self.errorKeys.indexOf(item.key) >= 0;
        });
        if (!!error && !!error.key) {
            self.showError(error);
            return;
        }
        self.hideError();
    }
    private showError(error: any) {
        let resourceHelper: IResourceManager = window.ioc.resolve(IoCNames.IResource);
        let errorMessage: string = resourceHelper.resolve(error.key, error.params);
        this.el.classList.add(ValidationMode.Invalid);
        this.el.setAttribute("origin-title", this.el.title);
        this.el.title = errorMessage;

    }
    private hideError() {
        this.el.classList.remove(ValidationMode.Invalid);
        let holderText = this.el.getAttribute("origin-title");
        if (!!holderText) {
            this.el.title = holderText;
        }
    }

    protected onUnload():void{
        if(this.successSubscription){
            this.successSubscription.unsubscribe();
        }
        if(this.failSubscription){
            this.failSubscription.unsubscribe();
        }
    }
}