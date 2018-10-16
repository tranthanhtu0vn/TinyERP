import { BaseService } from "../baseService";
import { Promise } from "../../models/promise";
import { IMediaService } from "./imediaService";
import { FileUpload } from "../../models/media/fileUpload";
import { IConnector } from "../../connectors/iconnector";
import { IoCNames } from "../../ioc/enum";
export class MediaService extends BaseService implements IMediaService {
    public upload(file: FileUpload): Promise {
        let iconnector: IConnector = window.ioc.resolve(IoCNames.IConnector);
        return iconnector.post(this.resolve("medias"), file);
    }
}