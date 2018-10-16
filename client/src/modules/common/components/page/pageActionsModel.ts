export class PageActionsModel {
    public default: any = { hasValue: false };
    public items: Array<any> = [];
    constructor(actions: Array<any>) {
        // if (actions && actions.length === 1) {
        //     this.default = actions[0];
        //     this.default.hasValue = true;
        //     actions.shift();
        // }
        this.items = actions;
    }
}