import {Promise} from "@app/common";
export interface IAuthorizeStrategy{
    process(callback: (token: any)=>void):Promise;
}