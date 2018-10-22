import { Component } from "@angular/core";
import { BasePage } from "@app/common";
import {ISystemService, SystemService} from "../_share/services/systemService";
@Component({
    templateUrl: "src/modules/support/pages/sayHello.html"
})
export class SayHello extends BasePage<any>{
    public myName: string = "Tu Tran local";
    protected onReady(): void {
        let self = this;
        let service: ISystemService = new SystemService();
        service.getMyName().then((name: string) => {
            self.myName = name;
        });
    }
}