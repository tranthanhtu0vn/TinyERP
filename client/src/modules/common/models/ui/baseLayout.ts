import {LoadingIndicatorEvent, IEventManager, IoCNames} from "@app/common";
import { ComponentType } from "./enum";
import { BaseComponent } from "./baseComponent";
export class BaseLayout extends BaseComponent {
    private currentInstance: any;
    constructor() {
        super(ComponentType.Layout)
        let eventManager: IEventManager = window.ioc.resolve(IoCNames.IEventManager);
        eventManager.subscribe(LoadingIndicatorEvent.Show, (number: number) => {
            window.jQuery(".icon-loading").show();
        });
        eventManager.subscribe(LoadingIndicatorEvent.Hide, (number: number) => {
            window.jQuery(".icon-loading").hide();
        });
    }

    protected onReady() {
        let eventManager: IEventManager = window.ioc.resolve(IoCNames.IEventManager);
        eventManager.publish(LoadingIndicatorEvent.Hide);
    }

    public onComponentActivated(instance: any):void{
        if(this.currentInstance && this.currentInstance.onUnload){
            this.currentInstance.onUnload();
        }
        this.currentInstance = instance;
        if(this.currentInstance && this.currentInstance.onLoad){
            this.currentInstance.onLoad();
        }
    }
    public onComponentDeactivated(ev: any):void{
        console.log("onComponentDeactivated", ev);
    }
    protected onRouteNavigationStarted(ev: any): void {
        console.log("onRouteNavigationStarted", ev);
    }

    protected onRouteNavigationEnded(ev: any): void {
        console.log("onRouteNavigationEnded", ev);
    }
}