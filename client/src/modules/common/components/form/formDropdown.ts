import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BaseControl } from "../../models/ui";
import {LayoutDirection } from "../../enum";
import {Promise} from "../../models/promise";
import { DropdownFormItem } from "./dropdownFormItem";
@Component({
    selector: "form-dropdown",
    templateUrl: "src/modules/common/components/form/formDropdown.html"
})
export class FormDropdown extends BaseControl {
    @Input() noLabel: boolean = false;
    @Input() labelText: string = String.empty;
    @Output() readOnly:boolean = false;
    @Input() model: string;
    @Output() modelChange = new EventEmitter();
    @Input() direction: LayoutDirection = LayoutDirection.Horizontal;
    @Input() fetch: ()=> Promise;
    public items: Array<IDropdownFormItem>=[];
    public ENUMS: any = {
        LayoutDirection: LayoutDirection
    };
    public onValueChanged(evt: any) {
        this.setSelectedItem(new DropdownFormItem(evt.target.value, evt.target.value));
    }
    protected onReady(){
        let self=this;
        if(!!self.fetch){
            this.fetch().then((items: Array<IDropdownFormItem>)=>{
                self.items = items;
                let item: IDropdownFormItem =  self.getSelectedItem();
                self.setSelectedItem(item);
            });
        }
    }
    private getSelectedItem(){
        if(!this.model || String.isNullOrWhiteSpace(this.model)){return this.items[0];}
        let self=this;
        return this.items.firstOrDefault((item:IDropdownFormItem)=>{
            return self.model==item.value;
        });
    }
    private setSelectedItem(item: IDropdownFormItem):void{
        this.modelChange.emit(item.value);
    }
}