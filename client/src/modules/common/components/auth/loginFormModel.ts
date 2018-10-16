import { BaseModel } from "../../models/baseModel";
import { ValidationException } from "../../exception/validationException";
export class LoginFormModel extends BaseModel {
    public userName: string = "tu.tran@yahoo.com";
    public password: string = "123456";
    public getValidationErrors(): ValidationException {
        let exception: ValidationException = new ValidationException();
        if (String.isNullOrWhiteSpace(this.userName)) {
            exception.add("security.account.login.validation.emailIsRequired");
        }
        if (String.isNullOrWhiteSpace(this.password)) {
            exception.add("security.account.login.validation.pwdIsRequired");
        }
        return exception;
    }
}