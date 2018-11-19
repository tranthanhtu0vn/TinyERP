import { PageAction } from "@app/common";
export class StaffsModel{
    public actions:Array<PageAction>=[];
    public options: any = {};
    constructor(){
        this.options = {
            columns: [
                { field: "firstName", title: "First Name"},
                { field: "lastName", title: "Last Name"},
                { field: "department", title: "Department"}
            ]
        };
    }
    public addAction(action: PageAction):void{
        this.actions.push(action);
    }
}