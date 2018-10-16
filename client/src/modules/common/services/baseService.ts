import appHelper from "../application/appHelper";
export class BaseService {
    public resolve(url: string) {
        return String.format("{0}/{1}", appHelper.getConfig().rootApi, url);
    }
}