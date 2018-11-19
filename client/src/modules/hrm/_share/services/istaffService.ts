import {Promise} from "@app/common";
export interface IStaffService{
    getStaffs():Promise;
    create(model: any):Promise;
}