import {ValidationException} from "./validationException";
import {DecoratorConst} from "../enum";
import { ValidationError } from "./validationError";
import { IValidator } from "./validator/ivalidator";
let helper = {
    validate: validate,
    addValidationError:addValidationError ,
    removeValidationError:removeValidationError,
    addValidator: addValidator
};
export default helper;
function removeValidationError(target: any, propertyKey:string ,key:string , validationKey:string):void{
    let metadata = window.Reflect.getMetadata(key, target.constructor)||{};
    let errors:Array<IValidationError> = metadata[propertyKey]||[];
    errors = errors.remove((item: IValidationError)=>{return item.key==validationKey});
    metadata[propertyKey]=errors;
    window.Reflect.defineMetadata(key, metadata, target.constructor);
}

function addValidator(target: any, propertyKey:string ,key:string , validator:IValidator):void{
    let metadata = window.Reflect.getMetadata(key, target.constructor)||{};
    let validators:Array<IValidator> = metadata[propertyKey]||[];
    if(!validators.any((item: IValidator)=>{return item.name==validator.name && item.errorKey==validator.errorKey})){
        validators.push(validator);
    }
    metadata[propertyKey]=validators;
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
    let validators: Array<IValidator> = new Array<IValidator>();
    let metadata = window.Reflect.getMetadata(DecoratorConst.VALIDATOR_KEY, model.constructor)||{};
    for(var pro in metadata){
        if(!metadata.hasOwnProperty(pro)){continue;}
        let items: Array<IValidator>= metadata[pro];
        if(!items || items.length<=0){continue;}
        validators = validators.concat(items);//.addErrors(errors);//.add(validateItem.key,validateItem.params);
    }
    let validation:ValidationException = new ValidationException();
    validators.forEach((validator:IValidator)=>{
        if(!!validator.isValid(model[validator.property])){return;}
        validation.add(validator.errorKey,{});
    });
    return validation;
}