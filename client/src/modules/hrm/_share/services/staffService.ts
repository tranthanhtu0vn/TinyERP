
import {BaseService, Promise, IConnector, IoCNames} from "@app/common";
import {IStaffService} from "./istaffService";
export class StaffService extends BaseService implements IStaffService{
    public getStaffs():Promise{
        let uri="http://localhost:56622/api/hrm/staffs";
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.get(uri);
    }
}