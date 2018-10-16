import { ToggleType } from "../../enum";
import { IToggleComponent } from "./itoggleComponent";
import { IUIToggleHandler } from "./iuitoggleHandler";
import { PlusMinusToggleHandler } from "./plusMinusToggleHandler";
import {VideoToggleHandler} from "./videoToggleHandler";
import {CheckToggleHandler} from "./checkToggleHandler";
import {ActiveOrInActiveToggleHandler} from "./activeOrInActiveToggleHandler";
export class UIToggleHandlerFactory {
    public static create(type: ToggleType, comp: IToggleComponent): IUIToggleHandler {
        switch (type) {
            case ToggleType.ActiveOrInActive:
                return new ActiveOrInActiveToggleHandler(comp);
            case ToggleType.Check:
                return new CheckToggleHandler(comp);
            case ToggleType.Video:
                return new VideoToggleHandler(comp);
            case ToggleType.PlusMinus:
            default:
                return new PlusMinusToggleHandler(comp);
        }
    }
}