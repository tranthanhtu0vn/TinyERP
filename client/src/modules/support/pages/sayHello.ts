import { Component } from "@angular/core";
import {BasePage} from "@app/common";
@Component({
    templateUrl:"src/modules/support/pages/sayHello.html"
})
export class SayHello extends BasePage<any>{
    public myName: string="Tu Tran";
}