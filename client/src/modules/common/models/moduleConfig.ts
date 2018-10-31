export class ModuleConfig {
    public name: string = String.empty;
    public ioc: Array<any> = [];
    public routes: Array<any> = [];
    public menus: Array<any> = [];
    public locale: string = String.empty;
    constructor(name: string, ioc: Array<any>, routes: Array<any> = [], menus: Array<any> = []) {
        this.name = name;
        this.ioc = ioc;
        this.routes = routes;
        this.menus = menus;
    }
} 