import { IUIToggleHandler } from "./iuitoggleHandler";
import { IToggleComponent } from "./itoggleComponent";
import { ActiveOrInActiveToggleState } from "../../enum";

export class ActiveOrInActiveToggleHandler implements IUIToggleHandler {
    private component: IToggleComponent;
    constructor(component: IToggleComponent) {
        this.component = component;
    }
    public next(): void {
        let currentState = this.component.state;
        let nextState = currentState !== ActiveOrInActiveToggleState.Active ? ActiveOrInActiveToggleState.Active : ActiveOrInActiveToggleState.InActive;
        this.component.stateChange.emit(nextState);
    }
}