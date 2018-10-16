import { IAccountService } from "./iaccountService";
// import { BaseService, IConnector, Promise, IoCNames } from "@app/common";
import { BaseService } from "./baseService";
import { IConnector } from "../connectors/iconnector";
import { Promise } from "../models/promise";
import { IoCNames } from "../ioc/enum";

export class AccountService extends BaseService implements IAccountService {
    public login(loginRequest: any): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.post(this.resolve("accounts/login"), loginRequest);
    }
    public registerUser(createUserRequest: any): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.post(this.resolve("accounts/register"), createUserRequest);
    }
    public activateAccount(activationCode: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.post(this.resolve("accounts/activate/" + activationCode), {});
    }
    public getProfile(authToken: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url = String.format("accounts/{0}/profile", authToken);
        return iconnector.get(this.resolve(url));
    }
    public getUserProfileByInvitationCode(invitationCode: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url = String.format("accounts/{0}/getProfileByInvitationCode", invitationCode);
        return iconnector.get(this.resolve(url));
    }
    public updateAccountAvatar(authToken: string, mediaId: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url = String.format("accounts/{0}/updateAvatar/{1}", authToken, mediaId);
        return iconnector.post(this.resolve(url), {});
    }
    public signout(authToken: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url = String.format("accounts/{0}/signout", authToken);
        return iconnector.post(this.resolve(url), {});
    }
    public getWatchedCourses(authToken: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url = String.format("accounts/{0}/watchedCourses", authToken);
        return iconnector.get(this.resolve(url));
    }
    public getMyCourses(authToken: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url = String.format("accounts/{0}/courses", authToken);
        return iconnector.get(this.resolve(url));
    }

    public getSubscribedCourses(authToken: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url = String.format("accounts/{0}/subscribedCourses", authToken);
        return iconnector.get(this.resolve(url));
    }

    public addSubscription(authToken: string, item: any): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url = String.format("accounts/{0}/subscribedCourses", authToken);
        return iconnector.get(this.resolve(url));
    }
}