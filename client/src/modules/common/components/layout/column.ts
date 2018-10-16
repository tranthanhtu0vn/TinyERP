import { Component, Input } from "@angular/core";
import { BaseControl } from "@app/common";
@Component({
    selector: "column",
    templateUrl: "src/modules/common/components/layout/column.html"
})
export class Column extends BaseControl {
    @Input() cls: string;
}