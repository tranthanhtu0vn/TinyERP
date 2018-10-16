import {FileUpload} from "../../models/media/fileUpload";
import {Promise} from "../../models/promise";
export interface IMediaService {
    upload(file: FileUpload): Promise;
}