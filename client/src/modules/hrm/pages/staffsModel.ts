import { PageAction } from "@app/common";
export class StaffsModel{
    public actions:Array<PageAction>=[];
    public options: any = {};
    constructor(i18n: any){
        this.options = {
            columns: [
                { field: "firstName", title: i18n.hrm.staffs.firstName},
                { field: "lastName", title: i18n.hrm.staffs.lastName},
                { field: "department", title: i18n.hrm.staffs.department}
            ]
        };
    }
    public addAction(action: PageAction):void{
        this.actions.push(action);
    }
}