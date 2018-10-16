import guidHelper from "../../helpers/guidHelper";
import { Hashtable } from "../../models/list/hashtable";
import {IGridItemAction} from "./enum";
import { UIControlType, UIControlCls } from "../../enum";
export class GridModel {
    private static NumberOfInstance = 0;
    public id: string = String.format("_grid{0}", GridModel.NumberOfInstance);
    public data: Array<any> = [];
    private options: any = null;
    public actions: Hashtable<any> = new Hashtable<any>();
    constructor(options: any) {
        GridModel.NumberOfInstance++;
        this.data = options.data;
        this.options = options;
    }
    public getColumns(): Array<any> {
        let columns: Array<any> = [];
        if (!this.options || !Array.any(this.options.columns)) { return columns; }
        this.options.columns.forEach(function (column: any, index: number) {
            columns.push({ "data": column.field, title: column.title, "targets": index, "defaultContent": !!column.content ? column.content : String.empty, "render": !!column.render ? column.render : null });
        });
        //let actionContent = this.getActions();
        let self=this;
        //if (!String.isNullOrWhiteSpace(actionContent)) {
        columns.push({ width: "15%", orderable: false, data: null, title: "", targets: columns.length, "defaultContent": "", "render": (dataItem: any)=>{
            return self.getActions(dataItem);
        } });
        //}
        return columns;
    }
    /* Resolve static text to i18n later */
    private getActions(dataItem: any=null) {
        let html: string = String.empty;
        if (this.options.enableEdit === true) {
            html += "<input type=button class=\"btn btn-default grid-edit-item\" id=\"editGridItem\" value=\"Edit\"/>";
        }
        if (this.options.enableDelete === true) {
            html += "<input type=button class=\"btn btn-danger grid-delete-item\" id=\"deleteGridItem\" value=\"Delete\"/>";
        }
        if (this.options.actions && this.options.actions.length > 0) {
            let self: any = this;
            this.options.actions.forEach(function (action: any) {
                if(action.isValid && !action.isValid(dataItem)){return;}
                let itemId: string = "cus_action_" + guidHelper.create();
                self.actions.set(itemId, action);
                let cls:string =self.getCls(action);
                html += String.format("<input type=button class=\"btn custom-actions {2}\" id=\"{0}\" value=\"{1}\"/>", itemId, action.text, cls);
            });
        }
        return html;
    }
    private getCls(action: IGridItemAction):string{
        if(!String.isNullOrWhiteSpace(action.cls)){
            return action.cls;
        }
        // temporaly. Should have separated function for this
        switch(action.uiControlType){
            case UIControlType.Danger:
                return UIControlCls.Danger;
            default:
                return UIControlCls.Default;
        }
    }

}