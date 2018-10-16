let deviceHelper = {
    isMobile: isMobile
};
export default deviceHelper;
function isMobile() {
    if (/Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true;
    }
    return false;
}