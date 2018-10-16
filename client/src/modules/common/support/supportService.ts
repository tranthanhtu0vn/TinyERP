import { BaseService } from "../services/baseService";
import { ISupportService } from "./isupportService";
import { IConnector } from "../connectors/iconnector";
import { Promise } from "../models/promise";
import { IoCNames } from "../ioc/enum";

export class SupportService extends BaseService implements ISupportService {
    public getItemsByCategory(categoryKey: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.get(this.resolve(String.format("support/categories/{0}/items", categoryKey)));
    }

    public deleteCategory(id: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.delete(this.resolve(String.format("support/categories/{0}", id)));
    }

    public getCategories(): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.get(this.resolve("support/categories"));
    }

    public getCategory(itemId:string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.get(this.resolve(String.format("support/categories/{0}", itemId)));
    }

    public updateCategory(model: any): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url:string=String.format("support/categories/{0}", model.id);
        return iconnector.post(this.resolve(url), model);
    }

    public createCategory(model: any): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url:string="support/categories";
        return iconnector.post(this.resolve(url), model);
    }


    public deleteSupportItem(id: string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.delete(this.resolve(String.format("support/items/{0}", id)));
    }

    public getSupportItems(): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.get(this.resolve("support/items"));
    }

    public getSupportItem(itemId:string): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.get(this.resolve(String.format("support/items/{0}", itemId)));
    }

    public updateSupportItem(model: any): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url:string=String.format("support/items/{0}", model.id);
        return iconnector.post(this.resolve(url), model);
    }

    public createSupportItem(model: any): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        let url:string="support/items";
        return iconnector.post(this.resolve(url), model);
    }
}