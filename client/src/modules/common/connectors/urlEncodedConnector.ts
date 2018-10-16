import {Headers} from "@angular/http";
import { ExternalHttpConnector } from "./externalHttpConnector";
import {UrlEncodedHeaders} from "./urlEncodedHeaders";
import urlEncodedHelper from "../helpers/urlEncodedHelper";

export class UrlEncodedConnector extends ExternalHttpConnector{

    protected getContent(data: any):string{
        return urlEncodedHelper.objectToString(data);
    }
    protected getHeader(): Headers{
        return new UrlEncodedHeaders(false);
    }
}