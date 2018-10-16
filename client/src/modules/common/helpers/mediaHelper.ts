import appHelper from "../application/appHelper";
import {AppSettingType} from "../enum";

let helper = {
    resolveUrl: resolveUrl
};
export default helper;
function resolveUrl(mediaId: string) {
    let mediaUrl: IAppSettingItem = appHelper.getConfig().settings.firstOrDefault((item: IAppSettingItem) => {
        return item.name == AppSettingType.MediaUri;
    });
    return String.format("{0}/{1}", mediaUrl.value, mediaId);
}