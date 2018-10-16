import { BaseEvent } from "../../event/baseEvent";

export class OnProfileAvatarChanged extends BaseEvent {
    private static readonly key="App.Account.Authorization.OnProfileAvatarChanged";
    public avatar: string;
    constructor(avatar: string="") {
        super(OnProfileAvatarChanged.key);
        this.avatar = avatar;
    }
}