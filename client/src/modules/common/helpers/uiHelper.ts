import templateHelper from "./templateHelper";
import {IoCNames} from "../ioc/enum";
import {IEventManager} from "../event/ieventManager";
import {NotificationEvent, IInfoNotification} from "../enum";
const UIConst={
    TARGET_BLANK:"_blank"
};
let helper={
    createLink: createLink,
    showNotification: showNotification
};
export default helper;


function showNotification(option: IInfoNotification):void{
    let eventManager: IEventManager = window.ioc.resolve(IoCNames.IEventManager);
    eventManager.publish(NotificationEvent.Information, option);

}
function createLink(title:string, uri: string, openInNewWindow:boolean=true){
    let context: any ={
        title: title,
        text: title,
        href: uri,
        target: openInNewWindow==true?UIConst.TARGET_BLANK:String.empty
    };
    let html:string ="<a href=\"{{href}}\" title=\"{{title}}\" target=\"{{target}}\">{{text}}</a>";
    return templateHelper.compile(html, context);
}