import { IUIToggleHandler } from "./iuitoggleHandler";
import { IToggleComponent } from "./itoggleComponent";
import { ToggleState } from "../../enum";

export class PlusMinusToggleHandler implements IUIToggleHandler {
    private component: IToggleComponent;
    constructor(component: IToggleComponent) {
        this.component = component;
    }
    public next(): void {
        let currentState = this.component.state;
        let nextState = currentState !== ToggleState.Expand ? ToggleState.Expand : ToggleState.Collapse;
        this.component.stateChange.emit(nextState);
    }
}