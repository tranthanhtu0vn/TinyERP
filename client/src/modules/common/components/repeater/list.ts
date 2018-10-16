import { Component, Input, ContentChild, TemplateRef, Output, EventEmitter } from "@angular/core";
import { BaseControl } from "@app/common";
import helperFacade from "@app/common";
@Component({
    selector: "list",
    templateUrl: "src/modules/common/components/repeater/list.html"
})
export class List extends BaseControl {
    @Input() cls: string;
    @Input() itemCls: string;
    @Input() items: Array<any> = [];
    @ContentChild(TemplateRef) itemTemplate: TemplateRef<any>;
    @Output() onItemClicked: EventEmitter<any> = new EventEmitter<any>();
    @Input() itemIdPattern:string;
    @Input() noContentText:string="";
    public getItemId(item: any):string{
        let result=helperFacade.templateHelper.compile(this.itemIdPattern, item);
        return result;
    }
    // @Input() enableDraggable: boolean=false;
    // @Input() dropOption: DropOption;
    public onClicked: any = function (item: any): void {
        //item.toggleState = item.toggleState == ToggleState.Expand ? ToggleState.Collapse : ToggleState.Expand;
        //this.onItemClicked.emit(item);
    }
    // public getContext(item: any) {
    //     let context = helperFacade.objectHelper.clone(this);
    //     context.item = item;
    //     return context;
    // }
}