export const DecoratorConst={
    PROPERTY_KEY:"PROPERTY_KEY"
};
export function propertyName(name: string): any {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        var constructor = target.constructor||{};
        let metadata = window.Reflect.getMetadata(DecoratorConst.PROPERTY_KEY, constructor)||{};
        metadata[propertyKey]=name;
        window.Reflect.defineMetadata(DecoratorConst.PROPERTY_KEY, metadata, constructor);
    }
    // var oldValue = descriptor.value;

    // descriptor.value = function() {
    //   console.log(`Calling "${propertyKey}" with`, arguments,target);
    //   let value = oldValue.apply(null, [arguments[1], arguments[0]]);

    //   console.log(`Function is executed`);
    //   return value + "; This is awesome";
    // };

    // return descriptor;
  }