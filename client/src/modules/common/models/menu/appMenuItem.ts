export class AppMenuItem {
    public url: string = String.empty;
    public text: string = String.empty;
    public cls: string = String.empty;
    public subMenuItems: Array<AppMenuItem> = [];
    constructor(text: string, url: string = String.empty, cls: string = String.empty, subItems: Array<AppMenuItem> = []) {
        this.text = text;
        this.url = url;
        this.cls = cls;
        this.subMenuItems = subItems;
    }
    public hasChild() {
        return this.subMenuItems && this.subMenuItems.length > 0;
    }
}