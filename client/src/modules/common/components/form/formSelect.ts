import { Component, Input, Output, EventEmitter, ElementRef } from "@angular/core";
import { BaseControl } from "../../models/ui";
import {FormSelectType} from "../../enum";
import {Hashtable}  from "../../models/list/hashtable";

@Component({
    selector:"form-select",
    templateUrl:"src/modules/common/components/form/formSelect.html"
})
export class FormSelect extends BaseControl{
    public ENUMS:any={
        FormSelectType: FormSelectType
    };
    @Input() type: FormSelectType = FormSelectType.Single;
    @Input() items:Array<IFormSelectItem>=[];
    @Output() onChanged:EventEmitter<any> = new EventEmitter();
    @Input() noContentText:string="";
    private dom:ElementRef;
    private hash:Hashtable<IFormSelectItem> = new Hashtable<IFormSelectItem>();
    constructor(ref: ElementRef){
        super();
        this.dom=ref;
    }
    public getSelectedItems():Array<IFormSelectItem>{
        return this.hash.toArray((key:string, item:IFormSelectItem)=>{return item.selected==true;});
    }
    public onItemsChanged(items: Array<IFormSelectItem>):void{
        let self=this;
        window.setTimeout(()=>{
            self.hash.clear();
            self.hash.import(items,(item: any)=>{return item.value;});
            self.initControl();
        },0);
    }
    public initControl():void{
        let inputs: any=window.jQuery(this.dom.nativeElement).find("input.flat");
        let self=this;
        if(!inputs || inputs.length==0){return;}
        
        window.jQuery(inputs).iCheck({
            checkboxClass: 'icheckbox_flat-green',
            radioClass: 'iradio_flat-green'
        })
        .on("ifChecked",(ev: any)=>{
            let itemId=ev.target.value;
            if(!self.hash.exist(itemId)){return;}
            self.hash.get(itemId).selected=true;
            self.onChanged.emit(self.getSelectedItems());
            console.log("ifChecked", self.hash.get(itemId));
        })
        .on("ifUnchecked",(ev: any)=>{
            let itemId=ev.target.value;
            if(!self.hash.exist(itemId)){return;}
            self.hash.get(itemId).selected=false;
            self.onChanged.emit(self.getSelectedItems());
            console.log("ifUnchecked", self.hash.get(itemId));
        });
        window.jQuery(inputs[0]).iCheck("check");
    }
}