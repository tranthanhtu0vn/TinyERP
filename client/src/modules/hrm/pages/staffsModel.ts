export class StaffsModel{
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
}