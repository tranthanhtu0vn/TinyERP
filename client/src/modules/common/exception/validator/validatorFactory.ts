import { IValidator } from "./ivalidator";
import { ValidationType } from "../enum";
import { StringValidator } from "./stringValidator";

export class ValidatorFactory{
    public static create(type:string):IValidator{
        switch(type){
            default:
            case ValidationType.StringValidator:
            return new StringValidator();
        }

    }
}