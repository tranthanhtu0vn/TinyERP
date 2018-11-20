
import {BaseService, Promise, IConnector, IoCNames} from "@app/common";
import {IStaffService} from "./istaffService";
export class StaffService extends BaseService implements IStaffService{
    public getStaffs():Promise{
        let uri="http://localhost:86/api/hrm/staffs";
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.get(uri);
    }

    public create(staff: any):Promise{
        let uri="http://localhost:86/api/hrm/staffs";
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.post(uri, staff);
    }
}