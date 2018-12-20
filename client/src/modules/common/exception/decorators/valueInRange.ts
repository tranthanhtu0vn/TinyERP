import { DecoratorConst } from "../../enum";
import { IValidator } from "../validator/ivalidator";
import { ValidatorFactory } from "../validator/validatorFactory";
import validationHelper from "../validationHelper";
import { IEventManager } from "../../event/ieventManager";
import { IoCNames } from "../../ioc/enum";
import { ValidationEvent } from "../enum";
import { ValidationException } from "../validationException";
import {CreateValidatorOption} from "../validator/createValidatorOption";
import { StringValueInRangeValidator } from "../validator/stringValueInRangeValidator";

export function valueInRange(min:number, max: number, errorKey: string): any{
    return function(target: any, propertyKey: string, descriptor: any){
        var type: any = window.Reflect.getMetadata("design:type", target, propertyKey);
        let internalVal="";
        let typeName:string = type.name;
        typeName=String.format("{0}{1}Validator", String.toPascalCase(typeName), "ValueInRange");
        let validator: StringValueInRangeValidator = <StringValueInRangeValidator>ValidatorFactory.create(new CreateValidatorOption(typeName, propertyKey, errorKey));
        validator.max=max;
        validator.min=min;
        validationHelper.addValidator(target, propertyKey,DecoratorConst.VALIDATOR_KEY, validator);

        let setFunc=function(val: any){
            internalVal=val;
            let eventManager: IEventManager = window.ioc.resolve(IoCNames.IEventManager);
            let validationException: ValidationException = new ValidationException();
            validationException.add(errorKey);
            if(!validator.isValid(val)){
                eventManager.publish(ValidationEvent.ValidationFail, validationException);
            }else{
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