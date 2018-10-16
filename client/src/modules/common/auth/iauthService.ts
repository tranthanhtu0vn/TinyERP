export interface IAuthService {
    getUserProfile(): any;
    setUserProfile(userProfile: any): void;
    setAuth(auth: any): void;
    getAuth(): any;
    removeAuth(): void;
    isAuthenticated(profile: any): boolean;
    isAuthorized(): boolean;
    getAuthToken(): string;
}