import { Component, Input } from "@angular/core";
@Component({
    selector: "page",
    templateUrl: "src/modules/common/components/page/page.html"
})
export class Page {
    @Input() hasTitle:boolean=true;
}