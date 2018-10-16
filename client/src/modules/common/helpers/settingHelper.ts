import appHelper from "../application/appHelper";
import templateHelper from "./templateHelper";
import urlHelper from "./urlHelper";
import { AppSettingType } from "../enum";

let helper = {
    getNoPhotoUri: getNoPhotoUri,
    getInvitationLink: getInvitationLink,
    getQnAUrl: getQnAUrl,
    addSetting: addSetting,
    getLoginUri: getLoginUri,
    getCoursePreviewLink: getCoursePreviewLink,
    getAuthorizationReceiverUrl: getAuthorizationReceiverUrl,
    getUserDetailUri: getUserDetailUri,
    getDefaultUrl: getDefaultUrl,
    getSubscriptionPeriodFee: getSubscriptionPeriodFee,
    getNumOfDaysPerSubscriptionPeriod: getNumOfDaysPerSubscriptionPeriod,
    getUnauthorizeAccessUri: getUnauthorizeAccessUri
};
export default helper;
function getSubscriptionPeriodFee():number{
    let val:string =getSettingItemValue(AppSettingType.SUBSCRIPTION_POINT_PER_PERIOD);
    return Number.parseInt(val);
}
function getNumOfDaysPerSubscriptionPeriod():number{
    let val:string =getSettingItemValue(AppSettingType.SUBSCRIPTION_DAYS_PER_PERIOD);
    return Number.parseInt(val);
}
function getDefaultUrl(){
    let url:string =getSettingItemValue(AppSettingType.DEFAULT_URL);
    return url;
}
//by default, it was required that all app setting must add into settings with empty values.
// value for this will be updated in appropriated module.
function addSetting(key:string, value:string):void{
    let item:IAppSettingItem= getSettingItem(key);
    if(!!item && !String.isNullOrWhiteSpace(item.value)){
        //throw String.format("Setting item with '{0}' key was already existed", key);
        return;
    }
    item.value = value;
    //appHelper.getConfig().settings.push({name:key, value: value});
}
function getNoPhotoUri() {
    let settingItem: IAppSettingItem = appHelper.getConfig().settings.firstOrDefault((item: IAppSettingItem) => {
        return item.name == AppSettingType.NoPhoto;
    });
    if (!settingItem) {
        throw String.format("Can not found setting with \'{0}\' key.", AppSettingType.NoPhoto);
    }
    return settingItem.value;
}
function getInvitationLink(invitationCode:string):string{
    let url:string =getSettingItemValue(AppSettingType.LEARNING_STUDENT_INVITATION_LINK);
    let compiledUrl= templateHelper.compile(url, {invitationCode: invitationCode});
    return urlHelper.resolve(compiledUrl);

}
// function getInvitationLink(invitationCode: DOMStringList) {
//     let settingItem: IAppSettingItem = appHelper.getConfig().settings.firstOrDefault((item: IAppSettingItem) => {
//         return item.name == AppSettingType.InvitationLink;
//     });
//     if (!settingItem) {
//         throw String.format("Can not found setting with \'{0}\' key.", AppSettingType.InvitationLink);
//     }
//     let url = templateHelper.compile(settingItem.value, { invitationCode: invitationCode });
//     return urlHelper.resolve(url);
// }
function getUnauthorizeAccessUri(){
    return getSettingItemValue(AppSettingType.COMMON_UNAUTHORIZE_ACCESS_URI);
}

function getQnAUrl() {
    return getSettingItemValue(AppSettingType.QnAUrl);
}
function getUserDetailUri(userId:string):string{
    let url:string =getSettingItemValue(AppSettingType.SECURITY_USER_DETAIL_URL);
    return templateHelper.compile(url, {userId: userId});
}
function getAuthorizationReceiverUrl(options: any){
    let url:string =getSettingItemValue(AppSettingType.STORAGE_AUTHORIZATION_CODE_RECEIVE_URL);
    return templateHelper.compile(url, options);
}
function getCoursePreviewLink(courseId: string):string {
    let url:string =getSettingItemValue(AppSettingType.COURSE_PREVIEW_URI);
    return templateHelper.compile(url, {courseId: courseId});
}
function getLoginUri() {
    let uri:string = getSettingItemValue(AppSettingType.LOGIN_URI);
    return uri;
}

function getSettingItem(key:string):IAppSettingItem{
    return appHelper.getConfig().settings.firstOrDefault((item: IAppSettingItem) => {
        return item.name == key;
    });
}

function getSettingItemValue(key:string):string{
    let settingItem:IAppSettingItem = getSettingItem(key);
    if (!settingItem) {
        throw String.format("Can not found setting with \'{0}\' key.", key);
    }
    return settingItem.value;
}