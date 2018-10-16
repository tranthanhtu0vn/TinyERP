import { Directive, Input, ElementRef, HostListener } from "@angular/core";
import { BaseControl } from "../../models/ui/baseControl";
import { DropOption } from "./dropOption";
import { DragData } from "./dragData";
import dragndropHelper from "../../helpers/dragndropHelper";
import jsonHelper from "../../helpers/jsonHelper";
import {DragnDropEffect, DragnDropFormat} from "./enum";
import {IDragnDropManager} from "./idragndropManager";
import {IoCNames} from "../../ioc/enum";

@Directive({
    selector: "[app-droppable]"
})
export class Droppable extends BaseControl {
    @Input("app-droppable") option: DropOption;
    private get enable(): boolean {
        return !this.option ? false : this.option.enable;
    }
    public ui: HTMLElement;
    constructor(element: ElementRef) {
        super();
        this.ui = element.nativeElement;
    }
    public onOptionChanged(newVal: DropOption){
        // console.log("onOptionChanged", newVal);
        // if(!newVal || !newVal.enable){return;}
        // this.setupEvents();
    }
    protected onReady(): void {
        console.log("onReady");
        if (!this.enable) { return; }
        this.setupEvents();
    }
    private setupEvents(){
        console.log("setupEvents");
        let self = this;
        
        this.ui.addEventListener("dragenter",(ev:DragEvent)=>{
            self.onDragEnter(ev);
        }, true);
        this.ui.addEventListener("dragover",(ev:DragEvent)=>{
            self.onDragOver(ev);
        }, true);
        this.ui.addEventListener("dragleave",(ev:DragEvent)=>{
            self.onDragLeave(ev);
        }, true);
        this.ui.addEventListener("dragend",(ev:DragEvent)=>{
            self.onDragEnd(ev);
        }, true);
        // this.ui.ondrop= (ev: DragEvent) => {
        //     self.onDrop(ev);
        //     return false;
        // };

        // this.ui.ondragenter= (ev: DragEvent) => {
        //     self.onDragEnter(ev);
        //     return false;
        // };
        // this.ui.ondragleave= (ev: DragEvent) => {
        //     self.onDragLeave(ev);
        //     return false;
        // };
        // this.ui.ondragover= (ev: any) => {
        //     self.onDragOver(ev);
        //     return false;
        // };
        // this.ui.ondragend= (ev: DragEvent) => {
        //     self.onDragEnd(ev);
        // };
    }
    private onDrop(ev: DragEvent):void{
        ev.preventDefault();
        ev.stopPropagation();
        console.log("onDrop", ev);
        //console.log(ev.dataTransfer.getData(DragnDropFormat.Text));
        this.ui.classList.remove("dragndrop__over");
    }
    private onDragEnd(ev: DragEvent):void{
        ev.preventDefault();
        ev.stopPropagation();
        // ev.preventDefault();
        // ev.stopPropagation();
        // console.log("onDragEnd", ev);
        // this.ui.classList.remove("dragndrop__over");
        console.log("onDragEnd", ev);
        this.ui.classList.add("dragndrop__over");
    }
    private onDragEnter(ev: any): void {
        ev.preventDefault();
        ev.stopPropagation();
        if(ev.target!=this.ui){return;}
        if(ev.target==ev.relatedTarget){return;}
        console.log("onDragEnter", ev);
        //console.log("onDragEnter", ev);
        this.ui.classList.add("dragndrop__over");
    }
    private onDragLeave(ev: DragEvent): void {
        ev.preventDefault();
        ev.stopPropagation();
        if(ev.target!=this.ui){return;}
        if(ev.target==ev.relatedTarget){return;}
        //ev.stopPropagation();
        console.log("onDragLeave", ev);
        this.ui.classList.remove("dragndrop__over");
    }
    private onDragOver(ev: DragEvent): void {
        ev.preventDefault();
        ev.stopPropagation();
        // ev.preventDefault();
        // ev.stopPropagation();
        // if((<HTMLElement>ev.relatedTarget).nodeType==3){
        //     console.log("relatedTarget", ev.relatedTarget);
        // }
        if(ev.target!=this.ui){return;}
        let dragndropManager: IDragnDropManager = window.ioc.resolve(IoCNames.IDragnDropManager);
        let data: DragData = <DragData>dragndropManager.current.getData();
        console.log(this.ui.textContent);
        
        let cls:string=this.ui.className;
        if(!cls.contains(data.cls)){
            return;
        }
        console.log("onDragOver", ev);
        this.ui.classList.add("dragndrop__over");
        // let cls:string="course-curriculumn__lecture";
        // let dragndropManager: IDragnDropManager = window.ioc.resolve(IoCNames.IDragnDropManager);
        // let data: DragData = <DragData>dragndropManager.current.getData();
        // if(data.cls.contains(cls)){
        //     ev.preventDefault();
        //     ev.stopPropagation();
        // }
        // if(ev.preventDefault){
        //     ev.preventDefault();
        // }
        //ev.dataTransfer.effectAllowed=DragnDropEffect.Copy;
        //let dragData:DragData=jsonHelper.toObject(ev.dataTransfer.getData(DragnDropFormat.Text));
        // if(dragData.cls.contains(cls)){
        //     ev.preventDefault();
        //     ev.stopPropagation();
        // }
        //this.ui.classList.add("dragndrop__over");
        // if (dragndropHelper.isDroppable(this.option.selector, ev)) {
        //     ev.preventDefault();
        // }
    }
}