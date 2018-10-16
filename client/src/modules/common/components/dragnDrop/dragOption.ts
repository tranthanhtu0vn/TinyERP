import {DragnDropEffect} from "./enum";
export class DragOption{
    public enable: boolean;
    public data: any;
    public effect: string = DragnDropEffect.Move;
}