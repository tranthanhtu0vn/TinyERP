import {BaseEvent} from "@app/common";
export class OnUnAuthorizedAccess extends BaseEvent {
    public url:string;
    constructor(url?: string){
        super();
        this.url=url;
    }
}