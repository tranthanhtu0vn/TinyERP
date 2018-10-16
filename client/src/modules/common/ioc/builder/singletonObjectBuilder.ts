import {IObjectBuilder} from "./iobjectBuilder";
export class SingletonObjectBuilder implements IObjectBuilder {
    private obj: any;
    constructor(obj: any) {
        this.obj = obj;
    }
    public build() {
        let instanceFn = !this.obj.instanceFn ? new this.obj.instance() : this.obj.instanceFn;
        this.obj.instanceFn = instanceFn;
        return this.obj.instanceFn;
    }
}