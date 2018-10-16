import { ElementRef, Input, Output, Component, EventEmitter, ViewChild } from "@angular/core";
import { Http } from "@angular/http";
import { EventManager } from "../../event";
import { ValidationEvent } from "../../exception/enum";
import { BaseControl } from "../../models/ui";
import { GridModel } from "./gridModel";
@Component({
    selector: "grid",
    templateUrl: "src/modules/common/components/grid/grid.html"
})
export class Grid extends BaseControl {
    public model: GridModel;
    //private errorKeys: Array<string>;
    private grid: any;
    @Input() eventKey: string = String.empty;
    @Input() options: any = {};
    @Output() onItemEditClicked = new EventEmitter();
    @Output() onItemDeleteClicked = new EventEmitter();
    @Input() fetch: any;
    // @ViewChild(HTMLTableElement) gridEl: HTMLTableElement;
    protected onInit() {
        let self: Grid = this;
        self.model = new GridModel(self.options);
        if (!String.isNullOrWhiteSpace(self.eventKey)) {
            self.registerEvent(self.eventKey, function (data: any) { self.onDataSourceChanged(data); });
        }
    }
    public reload():void{
        this._fetch();
    }
    private _fetch():void{
        let self=this;
        this.fetch().then((data: any)=>{
            self.onDataSourceChanged(data);
        });
    }
    private onDataSourceChanged(items: Array<any>) {
        let self: Grid = this;
        self.grid.clear();
        self.grid.rows.add(items).draw();
    }
    protected onReady() {
        let $ = window.$;;
        let self: Grid = this;
        self.grid = $("#" + self.model.id).DataTable({
            data: self.model.data,
            columns: self.model.getColumns()
        });
        self.bindEvents();
        self._fetch();
    }
    private bindEvents() {
        let self: Grid = this;
        let $ = window.$;
        $("#" + self.model.id + " tbody").on("click", ".grid-edit-item", function () {
            let data = self.grid.row($(this).parents("tr")).data();
            self.onItemEditClicked.emit({ item: data, grid: self.grid });
        });

        $("#" + self.model.id + " tbody").on("click", ".grid-delete-item", function () {
            let data = self.grid.row($(this).parents("tr")).data();
            self.onItemDeleteClicked.emit({ item: data, grid: self.grid });
        });
        $("#" + self.model.id + " tbody").on("click", ".custom-actions", function () {
            let domId = this.id;
            let data = self.grid.row($(this).parents("tr")).data();
            let action = self.model.actions.get(domId);
            if (!action || !action.handler) { return; }
            action.handler({ item: data, grid: self.grid });
        });
    }
}