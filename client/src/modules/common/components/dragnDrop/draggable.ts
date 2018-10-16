import { Directive, Input, ElementRef, HostListener } from "@angular/core";
import {IoCNames} from "../../ioc/enum";
import { BaseControl } from "../../models/ui/baseControl";
import { DragOption } from "./dragOption";
import { DragData } from "./dragData";
import {DragnDropFormat, DragnDrop, DragnDropEffect} from "./enum";
import jsonHelper from "../../helpers/jsonHelper";
import guidHelper from "../../helpers/guidHelper";
import {IDragnDropManager} from "./idragndropManager";

@Directive({
    selector: "[app-draggable]"
})
export class Draggable extends BaseControl {
    @Input("app-draggable") option: DragOption;
    private dragImageObjId:string;
    private draggedImageObj: HTMLElement;
    private get enable(): boolean {
        return !this.option ? false : this.option.enable;
    }
    public ui: HTMLElement;
    constructor(element: ElementRef) {
        super();
        this.ui = element.nativeElement;
    }
    public onOptionChanged(newVal: DragOption, current: any){
        if(!newVal || newVal.enable!==true){
            return;
        }
        this.setup();
    }
    protected onReady(){
        if (!this.enable) { return; }
        this.setup();
    }
    protected setup() {
        this.ui.setAttribute("draggable", "true");
        this.ui.ondragstart=(ev: DragEvent) => {
            this.onDragStarted(ev);
        };
        this.ui.ondragend= (ev: DragEvent) => {
            this.onDragEnded(ev);
            return false;
        };
    }
    private onDragEnded(ev: DragEvent):void{
        let draggedImageObjs:Array<Node> =  [...this.ui.parentElement.childNodes].where((item: Node)=>{
            return (<HTMLElement>item).id && (<HTMLElement>item).id.startWith(DragnDrop.DragImageIdPrefix);
        });
        draggedImageObjs.each((node: Node)=>{
            (<HTMLElement>node).remove();
        });
    }
    private onDragStarted(ev: DragEvent): void {
        if(!this.ui.contains(<Element>ev.target)){
            event.preventDefault();
            return;
        }
        let dragData: DragData = new DragData(ev);
        dragData.data = this.option.data;
        let dragndropManager: IDragnDropManager = window.ioc.resolve(IoCNames.IDragnDropManager);
        dragndropManager.current.setData(dragData);
        //ev.dataTransfer.setData(DragnDropFormat.Text, jsonHelper.toJson(dragData));
        //ev.dataTransfer.setData(DragnDropFormat.Text,"just for testing");
        ev.dataTransfer.dropEffect=DragnDropEffect.Copy;
        this.configDragImage(ev);
    }
    private configDragImage(ev: DragEvent):void{
        this.draggedImageObj = <HTMLElement>this.ui.cloneNode(true);
        this.dragImageObjId=String.format("{0}{1}", DragnDrop.DragImageIdPrefix, guidHelper.create());
        this.draggedImageObj.id=this.dragImageObjId;
        this.draggedImageObj.classList.add("dragndrop__drag-image");
        this.ui.parentElement.appendChild(this.draggedImageObj);
        (<any>ev.dataTransfer).setDragImage(this.draggedImageObj, ev.offsetX, ev.offsetY);
    }
}