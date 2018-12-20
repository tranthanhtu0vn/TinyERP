import { IValidator } from "./ivalidator";
import {BaseValidator} from "./baseValidator";
import { ValidationType } from "../enum";

export class StringRequiredValidator extends BaseValidator implements IValidator{
    constructor(){
        super(ValidationType.StringRequiredValidator);
    }

    public isValid(val:string):boolean{
        return !String.isNullOrWhiteSpace(val);
    }
}