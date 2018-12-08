import { IValidator } from "./ivalidator";

export class StringValidator implements IValidator{
    public required(val:string):boolean{
        return !String.isNullOrWhiteSpace(val);
    }
}