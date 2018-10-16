import {IDragnDropManager} from "./idragndropManager";
export class DragnDropManager implements IDragnDropManager{
    private data: any;
    private static currentInstance: IDragnDropManager=null;
    public get current(): IDragnDropManager{
        if(DragnDropManager.currentInstance==null){
            DragnDropManager.currentInstance=new DragnDropManager();
        }
        return DragnDropManager.currentInstance;
    }
    public setData(data: any):void{
        this.data=data;
    }
    public getData():any{
        return this.data;
    }
}