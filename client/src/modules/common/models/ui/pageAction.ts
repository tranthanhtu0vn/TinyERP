import { PageActionItemType } from "../../enum";
export class PageAction {
    public key: string = String.empty;
    public cls: string;
    public handler: (sender: any, args: any) => void;
    public type: PageActionItemType = PageActionItemType.Button;
    constructor(key: string, handler: any, cls: string = "") {
        this.key = key;
        this.handler = handler;
        this.cls = cls;
    }
}