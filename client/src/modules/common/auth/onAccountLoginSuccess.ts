import { BaseEvent } from "../event/baseEvent";

export class OnAccountLoginSuccess extends BaseEvent {
    private static readonly key = "App.Account.Authorization.OnAccountLoginSuccess";
    public id: string;
    public authToken: string;
    public avatar: string;
    public firstName: string;
    public fullName: string;
    public roles: string;
    public lastName: string;
    public tokenExpiredAfter: string;
    constructor(loginResponse: any = null) {
        super(OnAccountLoginSuccess.key);
        if (!loginResponse) { return; }
        this.authToken = loginResponse.authToken;
        this.avatar = loginResponse.avatar;
        this.firstName = loginResponse.firstName;
        this.fullName = loginResponse.fullName;
        this.roles = loginResponse.roles;
        this.id = loginResponse.id;
        this.lastName = loginResponse.lastName;
        this.tokenExpiredAfter = loginResponse.tokenExpiredAfter;
    }
}