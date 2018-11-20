import { PageActionItemType } from "../../enum";
import {IoCNames} from "../../ioc/enum";
import {IResourceManager} from "../../iresourceManager";
export class PageAction {
    public key: string = String.empty;
    public text:string="";
    public cls: string;
    public handler: (sender: any, args: any) => void;
    public type: PageActionItemType = PageActionItemType.Button;
    constructor(key: string, handler: any, text:string="", cls: string = "") {
        this.key = key;
        this.handler = handler;
        this.cls = cls;
        this.text=text;
    }
    public setText(val: string):PageAction{
        this.text=val;
        return this;
    }
    public getText():string{
        let resourceManager: IResourceManager = window.ioc.resolve(IoCNames.IResource);
        return !String.isNullOrWhiteSpace(this.text)?this.text: resourceManager.resolve(this.key);
    }
}