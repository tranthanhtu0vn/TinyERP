import { Input, ContentChildren, QueryList, Component, TemplateRef, ViewContainerRef, ViewChild, ComponentFactoryResolver, ElementRef, Injector, ComponentRef } from "@angular/core";
import { BaseControl, ComponentState, TabDirection } from "@app/common";
import { Tab } from "./tab";
import { TabState } from "./enum";

@Component({
    selector: "tabs",
    templateUrl: "src/modules/common/components/tab/tabs.html"
})
export class Tabs extends BaseControl {
    @Input() cls: string = "tabs";
    @Input() direction: TabDirection = TabDirection.Vertical;
    @ContentChildren(Tab) tabs: QueryList<Tab>;
    public headers: Array<any> = [];
    public SERVICES: any = {
        String: String
    };
    public ENUMS: any = {
        TabState: TabState,
        TabDirection: TabDirection
    };
    protected onBeforeReady(): void {
        let self = this;
        this.headers = [];
        this.tabs.forEach((tab: Tab, index: number) => {
            //if(tab.visible===false){return;}
            let headerItem = tab;
            if (!tab.enable) {
                headerItem.state = TabState.Disabled;
            }
            this.headers = this.headers.concat([headerItem]);
            tab.onRendered.subscribe(() => {
                self.onTabItemRendered(tab);
            });
        });
        if (this.headers.length > 0) {
            this.onHeaderItemClicked(this.headers[0]);
        }
    }
    private onTabItemRendered(tab: Tab): void {
        console.log(tab);
    }
    public onHeaderItemClicked(header: any): void {
        if (!header.enable) { return; }
        this.headers.forEach((headerItem: any) => {
            headerItem.hide();
        });
        header.state = TabState.Active;
        this.renderContent(header);
    }
    private renderContent(header: any): void {
        header.show();
    }
    public getClsForHeaderItemLink(header: any) {
        let result: any = {};
        result[String.format("{0}__header__item--active__text", this.cls)] = header.state == TabState.Active;
        result[String.format("{0}__header__item__text", this.cls)] = (header.state == TabState.InActive) && header.enable;
        result[String.format("{0}__header__item--disabled__text", this.cls)] = !header.enable;
        return result;
    }
}