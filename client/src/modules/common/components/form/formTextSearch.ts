import { EventEmitter, Component, Input, Output } from "@angular/core";
import { BaseControl } from "../../models/ui";

@Component({
    selector:"form-text-search",
    templateUrl:"src/modules/common/components/form/formTextSearch.html"
})
export class FormTextSearch extends BaseControl{
    @Input() labelText:string;
    @Input() placeHolderText:string;
    @Output() onSearchClicked:EventEmitter<string> = new EventEmitter();
    readonly internal:number=300;
    public keyword:string;
    private timeoutHandle: any=null;
    public onKeywordChanged(val:string):void{
        let self=this;
        if(self.keyword==val){return;}
        if(!!self.timeoutHandle){
            window.clearTimeout(self.timeoutHandle);
        }
        self.timeoutHandle = window.setTimeout(()=>{
            self.keyword=val;
            self.onSearchClicked.emit(val);
        }, self.internal);
        
    }
}