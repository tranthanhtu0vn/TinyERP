import { IUIToggleHandler } from "./iuitoggleHandler";
import { IToggleComponent } from "./itoggleComponent";
import { ToggleState } from "../../enum";

export class CheckToggleHandler implements IUIToggleHandler {
    private component: IToggleComponent;
    constructor(component: IToggleComponent) {
        this.component = component;
    }
    public next(): void {
        let currentState = this.component.state;
        let nextState = currentState !== ToggleState.UnCheck ? ToggleState.UnCheck : ToggleState.Check;
        this.component.stateChange.emit(nextState);
    }
}