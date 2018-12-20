import { IValidator } from "./ivalidator";
import { ValidationType } from "../enum";
import { StringRequiredValidator } from "./stringRequiredValidator";
import { CreateValidatorOption } from "./createValidatorOption";
import {StringValueInRangeValidator} from "./stringValueInRangeValidator";

export class ValidatorFactory{
    public static create(option:CreateValidatorOption):IValidator{
        switch(option.type){
            case ValidationType.StringValueInRangeValidator:
            return new StringValueInRangeValidator(option);
            default:
            case ValidationType.StringRequiredValidator:
            return new StringRequiredValidator(option);
        }

    }
}