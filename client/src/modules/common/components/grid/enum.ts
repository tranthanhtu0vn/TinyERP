import { UIControlType } from "../../enum";

export interface IGridActionEvent{
    item: any;
    grid: any;
}

export interface IGridItemAction{
    text:string;
    uiControlType: UIControlType,
    cls:string;
    isValid(item: any):boolean;
    handler(arg: IGridActionEvent):void;
}