import { IValidator } from "./ivalidator";
import { CreateValidatorOption } from "./createValidatorOption";

export class BaseValidator implements IValidator{
    public property:string;
    public errorKey:string;
    public name:string;
    constructor(option: CreateValidatorOption){
        this.name=option.type;
        this.property=option.property;
        this.errorKey=option.errorKey;
    }
    public isValid(val:any):boolean{
        return true;
    }
}