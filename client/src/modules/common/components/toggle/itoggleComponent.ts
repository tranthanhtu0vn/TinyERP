import { EventEmitter } from "@angular/core";
export interface IToggleComponent {
    type: any;
    state: any;
    stateChange: EventEmitter<any>;
}