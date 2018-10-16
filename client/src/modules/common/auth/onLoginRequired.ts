import { BaseEvent } from "../event/baseEvent";

export class OnLoginRequired extends BaseEvent {
    private static readonly key="App.Account.Authorization.OnLoginRequired";
    public returnUrl: string;
    constructor(returnUrl: string="") {
        super(OnLoginRequired.key);
        this.returnUrl = returnUrl;
    }
}