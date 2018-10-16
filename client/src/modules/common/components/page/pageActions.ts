import { Input, Component } from "@angular/core";
import { IResourceManager } from "../../iresourceManager";
import { BaseControl } from "../../models/ui";
import { PageActionsModel } from "./pageActionsModel";
import {PageActionItemType} from "../../enum";

@Component({
    selector: "page-actions",
    templateUrl: "src/modules/common/components/page/pageActions.html"
})
export class PageActions extends BaseControl {
    public PageActionItemType: any = PageActionItemType;
    public model: PageActionsModel = new PageActionsModel([]);
    @Input() actions: Array<any>;
    protected onInit() {
        this.model = new PageActionsModel(this.actions);
    }
    public onActionItemClicked(action: any) {
        if (!action || !action.handler) { return; }
        action.handler.call(action.handler);
    }
}