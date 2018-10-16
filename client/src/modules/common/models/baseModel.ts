import { ValidationException, ValidationEvent } from "../exception";
import { IEventManager } from "../event";
import { IoCNames } from "../ioc/enum";
export class BaseModel {
    public validated() {
        let validationException: ValidationException = this.getValidationErrors();
        if (!validationException) { return true; }
        validationException.throwIfHasError();
        return !validationException.hasError();
    }
    protected getValidationErrors(): ValidationException {
        return null;
    }
}