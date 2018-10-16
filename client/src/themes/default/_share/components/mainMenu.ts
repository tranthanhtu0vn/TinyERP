import { Component, Input } from "@angular/core";
import { AppMenuItem, BaseControl } from "@app/common";
@Component({
    selector: "main-menu",
    templateUrl: "src/themes/default/_share/components/mainMenu.html"
})
export class MainMenu extends BaseControl {
    public clientId="sidebar-menu";
    @Input() cls: string = "nav side-menu";
    @Input() items: Array<AppMenuItem>;
    protected onItemsChanged(): void {
        if (!window.triggerEvent) { return; }
        window.triggerEvent(window.EventNames.SIDEBAR_MENU_CHANGED, "#"+ this.clientId);
    }
}