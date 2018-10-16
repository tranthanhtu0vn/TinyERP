export class DropdownFormItem implements IDropdownFormItem{
    public value:string;
    public text: string;
    constructor(value:string, text: string){
        this.value=value;
        this.text=text;
    }
}