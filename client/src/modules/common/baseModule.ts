import { IRouteService } from "./services/irouteService";
import { IoCNames } from "./ioc/enum";
import { ModuleConfig } from "./models/moduleConfig";
import { IGenericEventManager } from "./event/ieventManager";
import { BaseEvent } from "./event/baseEvent";
import { OnModuleLoaded } from "./event/onModuleLoaded";

export class BaseModule {
    protected mainMenus: any;
    protected name: string;
    protected iocConfig: Array<any> = [];
    protected routeConfig: Array<any> = [];
    constructor(config: ModuleConfig) {
        this.name = config.name;
        this.registerIoC(config.ioc);
        this.registerModuleRoutes(config.routes);
        this.mainMenus = config.menus;
        this.registerModuleEvents();
        this.onLoaded();
    }
    protected onLoaded(): void {
        let genericEventManager: IGenericEventManager = window.ioc.resolve(IoCNames.IGenericEventManager);
        let onModuleLoaded: BaseEvent = new OnModuleLoaded(this.name, this.mainMenus);
        genericEventManager.publish(onModuleLoaded);
    }
    protected registerModuleEvents() { }
    protected registerIoC(ioc: Array<any>) {
        window.ioc.import(ioc);
    }
    protected registerModuleRoutes(route: any) {
        let routeService: IRouteService = window.ioc.resolve(IoCNames.IRouteService);
        routeService.registerModuleRouteConfig(this.name, route);
    }
}