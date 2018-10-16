import {BaseEvent} from "./baseEvent";
import {ApplicationEventType} from "./enum";
export class OnModuleLoaded extends BaseEvent {
    public readonly name: string;
    public readonly mainMenus: Array<any> = [];
    constructor(moduleName: string, menus: Array<any>) {
        super(ApplicationEventType.OnModuleLoaded);
        this.name = moduleName;
        this.mainMenus = menus;
    }
}