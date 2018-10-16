import { StorageType, StorageStatus } from "../../enum";

export interface IAuthorizeOption{
    type: StorageType;
    status: StorageStatus;
    authority: string;
    clientId: string;
    secret: string;
    scope: string;
    redirectUri:string;
    authorizationCode: string;
}