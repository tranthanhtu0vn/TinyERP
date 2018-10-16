import { VisibilityType } from "../enum";
let domHelper = {
    createScript: createScript,
    createStyle: createStyle,
    isVisible: isVisible,
    toggle: toggle,
    show: show,
    hide: hide,
    getAttributeValue: getAttributeValue,
    addClass: addClass,
    removeClass: removeClass,
    registerEvent: registerEvent,
    append: append
};
export default domHelper;
function append(selector:any, html: string){
    window.jQuery(selector).append(html);
}
function registerEvent(target: any, eventName: string, handler: any) {
    if (!target) {
        throw "target was required for registerEvent";
    }
    window.jQuery(target).on(eventName, handler)
    //target.addEventListener(eventName, function(){});
}
function removeClass(target: any, cls: string) {
    if (String.isNullOrWhiteSpace(cls)) { return; }
    window.jQuery(target).removeClass(cls);
}
function addClass(selector: string, cls: string) {
    window.jQuery(selector).addClass(cls);
}
function getAttributeValue(obj: any, attName: string) {
    if (!obj) { return ""; }
    return window.jQuery(obj).attr(attName);
}
function toggle(target: any) {
    let dom: any = window.jQuery(target);
    if (isVisible(dom)) {
        hide(dom);
    } else {
        show(dom);
    }
}
function show(dom: any) {
    window.jQuery(dom).fadeIn();
}
function hide(dom: any) {
    window.jQuery(dom).fadeOut();
}
function isVisible(dom: any) {
    return dom.is(":visible");

}
function createStyle(src: string, callback: any = null) {
    var style = document.createElement('link');
    style.onload = function () {
        if (callback) {
            callback();
        }
    };
    style.href = src;
    style.rel = "stylesheet";
    document.getElementsByTagName('head')[0].appendChild(style);
}
function createScript(src: string, callback: any = null) {
    var script = document.createElement('script');
    script.onload = function () {
        if (callback) {
            callback();
        }
    };
    script.src = src;
    script.async = false;
    document.getElementsByTagName('head')[0].appendChild(script);
}