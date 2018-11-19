import {Promise, BaseService, IConnector, IoCNames} from "@app/common";

export interface ISystemService{
    getMyName():Promise;
}
export class SystemService extends BaseService implements ISystemService{
    public getMyName():Promise{
        let uri="http://api.tinyerp.training.com/api/system/getMyName";
        let connector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return connector.get(uri);
    }
}