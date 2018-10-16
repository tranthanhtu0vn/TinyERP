import { Promise } from "../models/promise";
export interface IAccountService {
    login(loginRequest: any): Promise;
    registerUser(createUserRequest: any): Promise;
    activateAccount(activationCode: string): Promise;
    getProfile(authToken: string): Promise;
    getUserProfileByInvitationCode(authToken: string): Promise;
    updateAccountAvatar(authToken: string, mediaId: string): Promise;
    signout(authToken: string): Promise;
    getWatchedCourses(authToken: string): Promise;
    getMyCourses(authToken:string):Promise;
    getSubscribedCourses(auth:string):Promise;
}