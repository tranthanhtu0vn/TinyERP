import { PageAction } from "./pageAction";
import { PageActionItemType } from "../../enum";
export class PageDropdownAction {
    public key: string = String.empty;
    public type: PageActionItemType;
    public items: Array<PageAction> = []
    constructor(key: string, subActions: Array<PageAction> = []) {
        this.key = key;
        this.type = PageActionItemType.Dropdown;
        this.items = subActions;

    }
}