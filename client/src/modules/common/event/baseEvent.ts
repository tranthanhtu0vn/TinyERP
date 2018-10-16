import { AppConst } from "../enum";
import { IBaseEvent } from "./ibaseEvent";
import { EventHandlerType } from "../enum";
export class BaseEvent implements IBaseEvent {
    public handlerType: EventHandlerType = EventHandlerType.Multiple;
    protected key: string = "";
    constructor(key: string = "", handlerType: EventHandlerType = EventHandlerType.Multiple) {
        this.key = key;
        this.handlerType = handlerType;
    }
    public getKey(): string {
        if (!String.isNullOrWhiteSpace(this.key)) {
            return this.key;
        }
        return this.constructor.name;
    }
}