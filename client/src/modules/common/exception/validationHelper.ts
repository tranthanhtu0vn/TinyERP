import {ValidationException} from "./validationException";
import {DecoratorConst} from "../enum";
let helper = {
    validate: validate,
    addValidationError:addValidationError ,
    removeValidationError:removeValidationError 
};
export default helper;
function removeValidationError(target: any, propertyKey:string ,key:string , validationKey:string):void{
    let metadata = window.Reflect.getMetadata(key, target.constructor)||{};
    let errors:Array<IValidationError> = metadata[propertyKey]||[];
    errors = errors.remove((item: IValidationError)=>{return item.key==validationKey});
    metadata[propertyKey]=errors;
    window.Reflect.defineMetadata(key, metadata, target.constructor);
}

function addValidationError(target: any, propertyKey:string ,key:string , validationError:IValidationError):void{
    let metadata = window.Reflect.getMetadata(key, target.constructor)||{};
    let errors:Array<IValidationError> = metadata[propertyKey]||[];
    if(!errors.any((item: IValidationError)=>{return item.key==validationError.key})){
        errors.push(validationError);
    }
    metadata[propertyKey]=errors;
    window.Reflect.defineMetadata(key, metadata, target.constructor);
}
function validate(model: any):ValidationException{
    let validation: ValidationException = new ValidationException();
    let metadata = window.Reflect.getMetadata(DecoratorConst.VALIDATION_KEY, model.constructor)||{};
    for(var pro in metadata){
        if(!metadata.hasOwnProperty(pro)){continue;}
        let validateItem: IValidationError= metadata[pro];
        validation.add(validateItem.key,validateItem.params);
    }
    return validation;
}