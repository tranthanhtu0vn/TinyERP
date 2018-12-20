export class CreateValidatorOption{
    public type:string;
    public property:string;
    public errorKey:string;
    public constructor(typeName:string, property:string, errorKey:string){
        this.type=typeName;
        this.property=property;
        this.errorKey=errorKey;
    }
}