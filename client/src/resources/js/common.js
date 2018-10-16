window.EventNames = {
    SIDEBAR_MENU_CHANGED: "SIDEBAR_MENU_CHANGED"
};
window.triggerEvent = function (evname, params) {
    //$(window).off(evname);
    $(window).trigger(evname, params);
}

window.registerEvent = function (evname, handler) {
    $(window).off(evname);
    $(window).on(evname, handler);
}
window.createMsalClientAgent=function(clientId){
    var clientApplication = new Msal.UserAgentApplication(clientId, null, function (errorDesc, token, error, tokenType) {
        // Called after loginRedirect or acquireTokenPopup
        console.log("Msal.UserAgentApplication");

    });
    return clientApplication;
}