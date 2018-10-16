let gcHelper = {
    collect: collect
};
export default gcHelper;
function collect(obj: any, proName: string) {
    if (!obj) { return; }
    delete obj[proName];
}