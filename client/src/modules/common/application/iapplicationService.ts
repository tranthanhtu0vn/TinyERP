import {BaseTheme} from "../models/ui/baseTheme";
export interface IApplicationService{
    setCurrentTheme(theme: BaseTheme):void;
    getCurrentTheme():BaseTheme;
}