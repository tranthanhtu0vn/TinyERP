import { BaseEvent } from "../../event/baseEvent";

export class OnProfileDetailRequired extends BaseEvent {
    private static readonly key="App.Account.Authorization.OnProfileDetailRequired";
    public userId: string;
    constructor(userId: string="") {
        super(OnProfileDetailRequired.key);
        this.userId = userId;
    }
}