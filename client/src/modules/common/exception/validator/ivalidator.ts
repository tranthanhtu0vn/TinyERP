export interface IValidator{
    property:string;
    errorKey:string;
    name:string;
    isValid(val: any):boolean;
    //required(val: any):boolean;
}