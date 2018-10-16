import { RouteSetting } from "../enum";
const DEFAULT_PORT = 80;
const HTTP_PROTOCOL_PREFIX = "http:";
const HTTPS_PROTOCOL_PREFIX = "https:";
let urlHelper = {
    resolve: resolve,
    isFixedUrl: isFixedUrl,
    encode: encode,
    decode: decode,
    getCurrentLocationRoot: getCurrentLocationRoot
};
export default urlHelper;
function getCurrentLocationRoot(){
    if(String.isNullOrWhiteSpace(window.location.port)){
        return String.format(
            "{0}//{1}",
            window.location.protocol,
            window.location.host
        );
    }
    let resolvedUrl = String.format(
        "{0}//{1}:{2}",
        window.location.protocol,
        window.location.host,
        window.location.port
    );
    return resolvedUrl;
}
function decode(value: string): string {
    if (String.isNullOrWhiteSpace(value)) { return ""; }
    return decodeURIComponent(value.replace(/\+/g, " "));
}
function encode(value: string): string {
    if (String.isNullOrWhiteSpace(value)) { return ""; }
    return encodeURIComponent(value).replace(/'/g, "%27").replace(/"/g, "%22");
}
function isFixedUrl(url: string) {
    if (isAbsoluteUrl(url)) { return true; }
    return !String.isNullOrWhiteSpace(url) && url.startWith(RouteSetting.SegmentSeparator);
}
function resolve(url: string) {
    if (isAbsoluteUrl(url)) { return url; }
    let resolvedUrl = String.format(
        "{0}/{1}",
        getCurrentLocationRoot(),
        url
    );
    return resolvedUrl;
}
function isAbsoluteUrl(url: string): boolean {
    return !String.isNullOrWhiteSpace(url) && (url.startsWith(HTTP_PROTOCOL_PREFIX) || url.startsWith(HTTPS_PROTOCOL_PREFIX));
}