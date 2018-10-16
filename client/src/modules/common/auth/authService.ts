import { PromiseFactory } from "../models/promise";
import { CACHE_CONSTANT } from "../services/cache/cacheService";
import { ICacheService } from "../services/cache/icacheService";
import { IAuthService } from "./iauthService";
import { IoCNames } from "../ioc/enum";
import { AuthToken } from "../auth/authToken";
export class AuthService implements IAuthService {
    private cacheService: ICacheService;
    constructor() {
        this.cacheService = window.ioc.resolve(IoCNames.ICacheService);
    }
    public getAuthToken(): string {
        let auth = this.getAuth();
        return !!auth && !!auth.token ? auth.token.value : String.empty;
    }
    public isAuthorized(): boolean {
        let auth: any = this.getAuth();
        return this.isAuthenticated(auth);
    }
    public isAuthenticated(auth: any): boolean {
        return !!auth.profile && new Date(auth.token.inMiliseconds) > new Date();
    }
    public removeAuth(): void {
        this.cacheService.remove(CACHE_CONSTANT.USER_PROFILE);
        this.cacheService.remove(CACHE_CONSTANT.TOKEN);
    }
    public getAuth(): any {
        let auth: any = {
            profile: this.cacheService.get(CACHE_CONSTANT.USER_PROFILE),
            token: this.cacheService.get(CACHE_CONSTANT.TOKEN)
        };
        return auth;
    }
    public setAuth(auth: any): void {
        this.cacheService.set(CACHE_CONSTANT.USER_PROFILE, auth);
        let token: AuthToken = new AuthToken(auth.authToken, auth.tokenExpiredAfter, auth.tokenExpiredInMiliseconds);
        this.cacheService.set(CACHE_CONSTANT.TOKEN, token);
    }
    public getUserProfile(): IUserProfile {
        if (!this.cacheService.exist(CACHE_CONSTANT.USER_PROFILE)) {
            return null;
        }
        let userProfile = this.cacheService.get(CACHE_CONSTANT.USER_PROFILE);
        return userProfile;
    }

    public setUserProfile(userProfile: IUserProfile): void {
        this.cacheService.set(CACHE_CONSTANT.USER_PROFILE, userProfile);
    }
}