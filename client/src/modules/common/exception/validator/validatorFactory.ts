import { IValidator } from "./ivalidator";
import { ValidationType } from "../enum";
import { StringRequiredValidator } from "./stringRequiredValidator";

export class ValidatorFactory{
    public static create(type:string):IValidator{
        switch(type){
            default:
            case ValidationType.StringRequiredValidator:
            return new StringRequiredValidator();
        }

    }
}