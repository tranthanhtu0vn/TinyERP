import { Component, Input, ViewChild, ElementRef } from "@angular/core";
import { BaseControl } from "../../models/ui/baseControl";
import { CopyableComponentType } from "../../enum";

@Component({
    selector: "copyable",
    templateUrl: "src/modules/common/components/common/copyable.html"
})
export class Copyable extends BaseControl {
    @Input() type: CopyableComponentType = CopyableComponentType.Text;
    @ViewChild("content") content: ElementRef;
    public ENUMS:any={
        CopyableComponentType: CopyableComponentType
    };
    public onCopyClicked($event: MouseEvent) {
        var $temp =  window.jQuery("<input>");
        window.jQuery("body").append($temp);
        $temp.val(window.jQuery(this.content.nativeElement).text().trim()).select();
        document.execCommand("copy");
        $temp.remove();
    }
}