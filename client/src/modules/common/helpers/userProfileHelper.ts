import { CACHE_CONSTANT } from "../services/cache/cacheService";
import { ICacheService } from "../services/cache/icacheService";
import { IoCNames } from "../ioc/enum";
import appHelper from "../application/appHelper";
let userProfileHelper: any = {
    getLang: getLang
};

export default userProfileHelper;
function getLang() {
    let defaultLang: string = appHelper.getConfig().localization.lang;
    let cacheService: ICacheService = window.ioc.resolve(IoCNames.ICacheService);
    if (!cacheService.exist(CACHE_CONSTANT.USER_PROFILE)) {
        return defaultLang;
    }
    let userProfile = cacheService.get(CACHE_CONSTANT.USER_PROFILE);
    return !!userProfile.lang && !String.isNullOrWhiteSpace(userProfile.lang) ? userProfile.languageCode : defaultLang;
}
