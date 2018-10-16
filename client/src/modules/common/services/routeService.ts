import { IRouteService } from "./irouteService";
import { IoCNames } from "../ioc/enum";
import { ICacheService } from "./cache/icacheService";
import objectHelper from "../helpers/objectHelper";
const ROUTE_PATTERN_IN_CACHE = "{0}_MODULE_ROUTE_CONFIG";
export class RouteService implements IRouteService {
    public registerModuleRouteConfig(moduleName: string, route: any) {
        let cacheService: ICacheService = window.ioc.resolve(IoCNames.ICacheService)
        cacheService.set(String.format(ROUTE_PATTERN_IN_CACHE, moduleName), route);
    }
    public getByRouteName(routeName: string): string {
        if (String.isNullOrWhiteSpace(routeName)) { return String.empty; }
        let moduleName = routeName.split(".")[0];
        let cacheService: ICacheService = window.ioc.resolve(IoCNames.ICacheService)
        let moduleRouteConfig = cacheService.get(String.format(ROUTE_PATTERN_IN_CACHE, moduleName));
        if (!moduleRouteConfig) { return String.empty; }
        let routePath = routeName.split(".").removeItem(moduleName).toString(".");
        return objectHelper.getByPath(moduleRouteConfig, routePath);
    }
}