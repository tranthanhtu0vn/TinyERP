import { IUIToggleHandler } from "./iuitoggleHandler";
import { IToggleComponent } from "./itoggleComponent";
import { VideoToggleState } from "../../enum";

export class VideoToggleHandler implements IUIToggleHandler {
    private component: IToggleComponent;
    constructor(component: IToggleComponent) {
        this.component = component;
    }
    public next(): void {
        let currentState = this.component.state;
        let nextState = currentState !== VideoToggleState.Play ? VideoToggleState.Play : VideoToggleState.Pause;
        this.component.stateChange.emit(nextState);
    }
}