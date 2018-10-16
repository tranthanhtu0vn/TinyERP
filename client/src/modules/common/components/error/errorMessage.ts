import { Component, Input, Output } from "@angular/core";
import { BaseControl } from "../../models/ui/baseControl";
import { ValidationError } from "../../exception/validationError";
import { ValidationException } from "../../exception/validationException";
import { IEventManager } from "../../event/ieventManager";
import { ValidationEvent } from "../../exception/enum";
import { IoCNames } from "../../ioc/enum";
import {AlertType} from "../../enum";
@Component({
    selector: "error-message",
    templateUrl: "src/modules/common/components/error/errorMessage.html"
})
export class ErrorMessage extends BaseControl {
    @Input() messages: Array<string> = [];
    @Input() cls: string = "error-message";
    @Input() title: string = this.i18nHelper.resolve("common.validation.fixErrors");;
    public errors: Array<ValidationError> = [];
    public get visible(): boolean{
        return this.errors.length > 0
    }
    public ENUMS:any={
        AlertType: AlertType
    };
    protected onReady() {
        let self = this;
        let eventManager: IEventManager = window.ioc.resolve(IoCNames.IEventManager);
        eventManager.subscribe(ValidationEvent.ValidationFail, (error: ValidationException) => self.onValidationFailed(error));
        eventManager.subscribe(ValidationEvent.ValidationSuccess, () => self.onValidationSuccess());
    }
    public clear():void{
        this.onValidationSuccess();
    }
    private onValidationSuccess():void{
        this.errors=[];
    }
    public resolve(item: ValidationError): string {
        return this.i18nHelper.resolve(item.key, item.params);
    }
    private onValidationFailed(ex: ValidationException): void {
        let self = this;
        self.errors = new Array<ValidationError>();
        if (!ex || !ex.errors || ex.errors.length <= 0) {
            return;
        }
        ex.errors.each((item: ValidationError) => {
            if (!self.messages.any((msg: string) => { return item.key.startWith(msg); })) { return; }
            self.errors.push(item);
        });
    }
}