import {BaseTheme} from "@app/common";
import {IApplicationService} from "./iapplicationService";
export class ApplicationService implements IApplicationService{
    private currentTheme: BaseTheme;
    public setCurrentTheme(theme: BaseTheme):void{
        this.currentTheme=theme;
    }
    public getCurrentTheme():BaseTheme{
        return this.currentTheme;
    }
}