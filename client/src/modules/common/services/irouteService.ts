export interface IRouteService {
    getByRouteName(routeName: string): any;
    registerModuleRouteConfig(moduleName: string, route: any): void;
}