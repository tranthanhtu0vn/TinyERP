import { ValidationError } from "../validationError";
import { DecoratorConst } from "../../enum";
import { IValidator } from "../validator/ivalidator";
import { ValidatorFactory } from "../validator/validatorFactory";
import validationHelper from "../validationHelper";
import { IEventManager } from "../../event/ieventManager";
import { IoCNames } from "../../ioc/enum";
import { ValidationEvent } from "../enum";
import { ValidationException } from "../validationException";

export function required(errorKey: string): any{
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        let internalVal="";
        let setFunc=function(val: any){
            internalVal=val;
            let typeName:string = typeof val;
            typeName=String.format("{0}Validator", String.toPascalCase(typeName));
            let validator: IValidator = ValidatorFactory.create(typeName);
            let eventManager: IEventManager = window.ioc.resolve(IoCNames.IEventManager);
            let validationException: ValidationException = new ValidationException();
            validationException.add(errorKey);
            console.log(new Date(), val);
            if(!validator.required(val)){
                let validationError: IValidationError= new ValidationError(errorKey,{});
                validationHelper.addValidationError(target, propertyKey,DecoratorConst.VALIDATION_KEY, validationError);
                eventManager.publish(ValidationEvent.ValidationFail, validationException);
            }else{
                validationHelper.removeValidationError(target, propertyKey,DecoratorConst.VALIDATION_KEY, errorKey);
                eventManager.publish(ValidationEvent.ValidationSuccess, validationException);
            }
        }
        let get=function(){
            return internalVal;
        }
        Object.defineProperty(target, propertyKey,{
            set:setFunc,
            get:get,
            enumerable: descriptor?descriptor.enumerable:true,
            configurable: descriptor?descriptor.configurable:true
        });
    }
}