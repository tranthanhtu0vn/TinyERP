
import { Input, ViewChild, ElementRef, Component, QueryList,  } from "@angular/core";
import { BaseControl } from "@app/common";
import helperFacade from "@app/common";
@Component({
    selector: "multi-columns",
    templateUrl: "src/modules/common/components/layout/multiColumns.html"
})
export class MultiColumns extends BaseControl {
    @Input() cls: string = "";
}