
import {BaseService, Promise, IConnector, IoCNames} from "@app/common";
import {IStaffService} from "./istaffService";
export class StaffService extends BaseService implements IStaffService{
    public getStaffs():Promise{
        let uri="/api/hrm/staffs.json";
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.get(uri);
    }
}