import { Component, Input } from "@angular/core";
@Component({
    selector: "horizontal-form",
    templateUrl: "src/modules/common/components/form/horizontalForm.html"
})
export class HorizontalForm {
    @Input() title: string;
    @Input() showBottomLine:boolean=true;
}