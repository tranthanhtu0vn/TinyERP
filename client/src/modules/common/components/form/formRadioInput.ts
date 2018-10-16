import { Input, Output, Component, EventEmitter } from "@angular/core";
import { BaseControl } from "../../models/ui/baseControl";
import { FormInputType } from "../../enum";

@Component({
    selector: "form-radio-input",
    templateUrl: "src/modules/common/components/form/formRadioInput.html"
})
export class FormRadioInput extends BaseControl {
    @Input() value: string;
    @Input() text: string;
    @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();
    @Input() isSelected: boolean;
    @Input() readOnly: boolean = false;
    @Input() type: string = FormInputType.Radio;
    @Input() name: string="ctr_name_"+this.id;
    public onChanged($event: any): void {
        this.onSelected.emit($event.target.value);
    }
}