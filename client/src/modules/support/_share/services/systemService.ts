import {Promise, BaseService, IConnector, IoCNames} from "@app/common";

export interface ISystemService{
    getMyName():Promise;
}
export class SystemService extends BaseService implements ISystemService{
    public getMyName():Promise{
        let uri="http://localhost:56622/api/system/getMyName";
        let connector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return connector.post(uri);
    }
}