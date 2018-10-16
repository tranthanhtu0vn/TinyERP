import { BaseModel } from "../../models/baseModel";
import { ValidationException } from "../../exception/validationException";

export class RegisterFormModel extends BaseModel {
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public confirmPassword: string;
    public invitor: string="...";
    public invitorCode: string;
    public getValidationErrors(): ValidationException {
        let exception: ValidationException = new ValidationException();
        if (String.isNullOrWhiteSpace(this.firstName)) {
            exception.add("security.account.register.validation.firstNameIsRequired");
        }
        if (String.isNullOrWhiteSpace(this.lastName)) {
            exception.add("security.account.register.validation.lastNameIsRequired");
        }
        if (String.isNullOrWhiteSpace(this.email)) {
            exception.add("security.account.register.validation.invalidEmail");
        }
        if (String.isNullOrWhiteSpace(this.password)) {
            exception.add("security.account.register.validation.invalidPassword");
        }
        if (this.password != this.confirmPassword) {
            exception.add("security.account.register.validation.passwordDoesNotMatch");
        }
        return exception;
    }
}