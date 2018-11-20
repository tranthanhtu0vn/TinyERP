import {PageAction} from "../../models/ui/pageAction";

export class PageActionsModel {
    public default: any = { hasValue: false };
    public items: Array<PageAction> = [];
    constructor(actions: Array<PageAction>) {
        this.items = actions;
    }
}