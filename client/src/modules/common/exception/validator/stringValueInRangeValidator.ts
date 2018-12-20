import { IValidator } from "./ivalidator";
import {BaseValidator} from "./baseValidator";
import { CreateValidatorOption } from "./createValidatorOption";

export class StringValueInRangeValidator extends BaseValidator implements IValidator{
    public max:number;
    public min:number;
    constructor(option: CreateValidatorOption){
        super(option);
    }

    public isValid(val:string):boolean{
        return !String.isNullOrWhiteSpace(val) && val.length> this.min && val.length<this.max;
    }
}