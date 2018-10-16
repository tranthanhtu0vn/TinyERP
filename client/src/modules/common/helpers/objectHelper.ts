let objectHelper = {
    getByPath: getByPath,
    extend: extend,
    clone: clone
};
export default objectHelper;
function clone(obj: any) {
    return window.Sys.extend({}, obj, true);
}
function extend(target: any, from: any) {
    return window.Sys.extend(target, from);
}
function getByPath(object: any, path: string) {
    let pathItems: Array<string> = path.split(".");
    let value = object;
    pathItems.forEach(element => {
        value = value[element];
    });
    return value;
}