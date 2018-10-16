import { Input, OnInit, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy, OnChanges, SimpleChanges } from "@angular/core";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Hashtable } from "../list/hashtable";
import { AuthenticatedEvent, ApplicationStateEvent } from "../../enum";
import { IConnector } from "../../connectors/iconnector";
import { IResourceManager } from "../../iresourceManager";
import { IEventManager } from "../../event";
import { ComponentType } from "./enum";
import { AuthenticationMode } from "./enum";
import { IoCNames } from "../../ioc/enum";
import { ILogger } from "../../services/logger/ilogger";

import guidHelper from "../../helpers/guidHelper";
import { ISession } from "../../storage/isession";
import routerHelper from "../../helpers/routerHelper";

export class BaseComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy, OnChanges, CanActivate {
    @Input() cls: string = "";
    protected eventManager: IEventManager;
    protected events: Hashtable<any>;
    public i18n: any;
    protected i18nHelper: IResourceManager;
    @Input() id: string = guidHelper.create();
    protected logger: ILogger;
    constructor(componentType: any = ComponentType.Layout) {
        this.eventManager = window.ioc.resolve(IoCNames.IEventManager);
        let resourceManager: IResourceManager = window.ioc.resolve(IoCNames.IResource);
        this.i18nHelper = resourceManager;
        this.i18n = resourceManager.getResourceData();
        this.events = new Hashtable<any>();
        this.logger = window.ioc.resolve(IoCNames.ILogger);
        this.registerEvents();

    }
    protected registerEvents():void{}
    canActivate(): Promise<boolean> | boolean {
        return true;
    }
    ngOnInit() {
        this.onInit();
        let self: BaseComponent = this;
        this.events.getKeys().forEach(function (key) {
            let handler: any = self.events.get(key);
            self.eventManager.subscribe(key, handler);
        });
    }
    protected onInit():void {
    }

    ngAfterContentInit() {
        this.onBeforeReady();
    }
    protected onBeforeReady() {
    }

    ngAfterViewInit() {
        this.onReady();
    }
    protected onReady() {
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let pro in changes) {
            if (!changes.hasOwnProperty(pro)) { continue; }
            //this.logger.info("Changes was deteched in {0} component:{1}", this.constructor.name, pro);
            let eventName = String.format("on{0}Changed", String.toPascalCase(pro));
            let eventFunc = this[eventName];
            if (eventFunc) {
                try {
                    eventFunc.call(this, changes[pro].currentValue, changes[pro].previousValue);
                } catch (e) {
                    this.logger.error("Error while calling event:" + eventName);
                    console.log(e);
                }
            }
        }
        this.onChange(changes);
    }

    protected onChange(changes: SimpleChanges) { }

    ngOnDestroy() {
        this.onUnload();
    }
    protected onUnload() {
        let self: BaseComponent = this;
        this.events.getKeys().forEach(function (key) {
            self.eventManager.unsubscribe(key);
            self.logger.info("\'{0}\' event was unsubcribe", key);
        });
    }

    public ngAfterViewChecked(): void {
        this.onComponentRendered.call(this);
    }
    protected onComponentRendered(): void { }

    protected setResources(resources: Array<string>) {
        let resourceHelper: IResourceManager = window.ioc.resolve(IoCNames.IResource);
        resourceHelper.load(resources);
    }

    public registerEvent(key: string, handler: any): void {
        this.events.set(key, handler);
    }
    protected log(...params: Array<any>) {
        this.logger.info.call(this.logger, params);
    }
    protected getData(key: string) {
        let session: ISession = window.ioc.resolve(IoCNames.ISession);
        let componentData = session.get(this.id);
        return !componentData ? {} : componentData;
    }
    protected setData(key: string, value: any) {
        let session: ISession = window.ioc.resolve(IoCNames.ISession);
        let componentData = session.get(this.id);
        componentData = !componentData ? {} : componentData;
        componentData[key] = value;
        session.set(this.id, componentData);
    }
    protected navigate(options: any, isUrlPath: boolean = false, openInNewWindow: boolean = false) {
        routerHelper.navigate(options, isUrlPath, openInNewWindow);
    }
    protected replaceState(newState: string): void {
        routerHelper.replaceState(newState);
    }
}