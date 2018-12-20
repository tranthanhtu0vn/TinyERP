import { IValidator } from "./ivalidator";

export class BaseValidator implements IValidator{
    public property:string;
    public errorKey:string;
    public name:string;
    constructor(name:string){
        this.name=name;
    }
    public isValid(val:any):boolean{
        return true;
    }
}