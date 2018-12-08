import { ValidationException } from "../exception";
import validationHelper from "../exception/validationHelper";
export class BaseModel {
    public validated() {
        let validationException: ValidationException = validationHelper.validate(this);
        let ex: ValidationException = this.getValidationErrors()
        validationException.addErrors(!!ex?ex.errors:[]);
        if (!validationException) { return true; }
        validationException.throwIfHasError();
        return !validationException.hasError();
    }
    protected getValidationErrors(): ValidationException {
        return null;
    }
}