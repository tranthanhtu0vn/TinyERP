export class EventHandlerNotFoundArg {
    public eventType: string;
    public arg: any;
    constructor(eventType: string, arg: any) {
        this.eventType = eventType;
        this.arg = arg;
    }
}