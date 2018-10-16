import { PromiseFactory, Promise } from "./models/promise";
import { Hashtable } from "./models/list/hashtable";
import { IoCNames } from "./ioc/enum";
import { IResourceManager } from "./iresourceManager";
import { IConnector } from "./connectors/iconnector";

import appHelper from "./application/appHelper";
import objectHelper from "./helpers/objectHelper";
import userProfileHelper from "./helpers/userProfileHelper";


export class ResourceManager implements IResourceManager {
    private resources: Hashtable<any>;
    private callbacks: Array<Hashtable<any>>;
    constructor() {
        this.resources = new Hashtable<any>();
        this.callbacks = new Array<Hashtable<any>>();
    }
    public getResourceData() {
        return this.resources.data;
    }
    public load(modules: Array<string>) {
        let self: ResourceManager = this;
        modules.forEach(function (module: string) {
            if (self.resources.exist(module)) { return; }
            self.loadResource(module);
        });
    }
    public resolve(key: string, ...params: Array<any>) {
        if (!key || key.split(".").length < 2) {
            throw "Invalid resource key: " + key;
        }
        let keyItems = key.split(".");
        let moduleName = keyItems.shift();
        let resourceObject = this.resources.get(moduleName);
        let value: string = objectHelper.getByPath(resourceObject, keyItems.join("."));
        if (!String.isNullOrWhiteSpace(value) && params && params.length > 0) {
            let errorParams: Array<any> = <Array<any>>params[0];
            if (errorParams.each) {
                errorParams.each((item: any, index: number) => {
                    value = value.replace("{" + index + "}", item.value);
                    value = value.replace("{{" + item.key + "}}", item.value);
                });
            }
        }
        return value;
    }
    private loadResource(moduleName: string): Promise {
        let def = PromiseFactory.create();
        let lang: string = userProfileHelper.getLang();
        let resourcePath = String.format("{0}{1}.{2}.json", appHelper.getConfig().localeUrl, moduleName, lang);
        let connector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let self: ResourceManager = this;
        connector.getJSON(resourcePath).then(function (data: any) {
            self.resources.set(moduleName, data);
            def.resolve({ module: moduleName, json: data });
        });
        return def;
    }
    private onNewResourceLoaded(params: any) {
        let moduleJson: any = params.json;
        let callbackes: Hashtable<any> = this.callbacks[params.module];
        let items: Array<string> = callbackes.getKeys();
        items.forEach(function (key: string) {
            let callback = callbackes.get(key);
            let value = objectHelper.getByPath(moduleJson, key);
            if (callback) {
                callback(value);
                callbackes.remove(key);
            }

        });
    }
}