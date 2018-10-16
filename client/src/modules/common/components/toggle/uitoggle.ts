import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ToggleType, ToggleState, VideoToggleState, Color, IconSize, ActiveOrInActiveToggleState } from "../../enum";
import { UIToggleHandlerFactory } from "../toggle/uitoggleHandlerFactory";
import { IUIToggleHandler } from "../toggle/iuitoggleHandler";
import { IToggleComponent } from "../toggle/itoggleComponent";
import { BaseControl } from "../../models/ui/baseControl";
@Component({
    selector: "ui-toggle",
    templateUrl: "src/modules/common/components/toggle/uitoggle.html"
})
export class UIToggle extends BaseControl implements IToggleComponent {
    @Output() onClicked: EventEmitter<any> = new EventEmitter<any>();
    @Input() text: string = "";
    @Input() cls: string;
    @Input() type: ToggleType;
    @Input() state: any;
    @Input() color: Color = Color.White;
    @Input() size: IconSize = IconSize.Medium;
    @Output() stateChange: EventEmitter<any> = new EventEmitter<any>();
    @Input() enabled:boolean=true;
    private handler: IUIToggleHandler = null;
    public ENUMS: any = {
        ToggleState: ToggleState,
        ToggleType: ToggleType,
        VideoToggleState: VideoToggleState,
        Color: Color,
        IconSize: IconSize,
        ActiveOrInActiveToggleState: ActiveOrInActiveToggleState
    };
    public onTypeChanged(newValue: ToggleType, oldValue: ToggleType) {
        this.handler = UIToggleHandlerFactory.create(newValue, this);
    }
    public onButtonClicked() {
        if(!this.enabled){return;}
        this.handler.next();
        this.onClicked.emit();
    }
}