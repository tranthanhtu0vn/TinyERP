import { StorageType } from "../../enum";
import {IAuthorizeOption} from "./iauthorizeOption";
import {IAuthorizeStrategy} from "./iauthorizeStrategy";
import {OneDriveAuthorizeStrategy} from "./onedrive/onedriveAuthorizeStrategy";


export class AuthorizeStrategyFactory{
    public static create(options: IAuthorizeOption): IAuthorizeStrategy{
        switch(options.type){
            case StorageType.OneDrive:
            default:
            return new OneDriveAuthorizeStrategy(options);
        }
    }
}