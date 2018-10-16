import { IoCLifeCycle } from "./enum";
import { SingletonObjectBuilder } from "./builder/singletonObjectBuilder";
import { TransientObjectBuilder } from "./builder/transientObjectBuilder";
import { IObjectBuilder } from "./builder/iobjectBuilder";
import appHelper from "../application/appHelper";
export class IoCFactory {
    public static create(): IocContainer {
        return new IocContainer();
    }
}
export class IocContainer {
    private registrations: Array<any>;
    constructor() {
        this.registrations = [];
    }
    public import(registrations: Array<any>) {
        this.registrations = this.registrations || [];
        this.registrations = this.registrations.merge(registrations, (item: any) => { return item.name; });
    }

    public resolve(obj: any): any {
        if (typeof obj == "function") {
            return this.resolveAngularObject(obj);
        }
        let declaration = this.registrations.firstOrDefault((item: any) => { return item.name == obj; });
        let objectBuilder: IObjectBuilder = this.getObjectBuilder(declaration);
        return objectBuilder.build();
    }
    private resolveAngularObject(obj: any) {
        return appHelper.injector.get(obj)
    }
    private getObjectBuilder(declaration: any): IObjectBuilder {
        switch (declaration.lifeCycle) {
            case IoCLifeCycle.Singleton:
                return new SingletonObjectBuilder(declaration);
            default:
            case IoCLifeCycle.Transient:
                return new TransientObjectBuilder(declaration);
        }
    }
}