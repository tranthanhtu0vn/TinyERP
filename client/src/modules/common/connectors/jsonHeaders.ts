import { Headers } from "@angular/http";
import { IoCNames } from "../ioc/enum";
import { IAuthService } from "../auth/iauthService";
import urlHelper from "../helpers/urlHelper";
export class JsonHeaders extends Headers {
    constructor(requireAuthInfo: boolean = true) {
        super();
        this.append("content-type", "application/json");
        this.append("accept", "application/json");
        this.append("Access-Control-Allow-Origin", urlHelper.getCurrentLocationRoot())
        if (!requireAuthInfo) { return; }
        let authService: IAuthService = window.ioc.resolve(IoCNames.IAuthService);
        this.append("authToken", authService.getAuthToken());
        if (authService.isAuthorized()) {
            let profile = authService.getUserProfile();
            this.append("authorization", profile.authorization);
        }
        //this.append("Access-Control-Allow-Origin","*");
    }
}