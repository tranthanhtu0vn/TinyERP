import { Promise, PromiseFactory } from "../models/promise";

let helper = {
    readAsDataUrl: readAsDataUrl
};
export default helper;
function readAsDataUrl(file: any): Promise {
    let def: Promise = PromiseFactory.create();
    let reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
        def.resolve(reader.result);
    }
    reader.readAsDataURL(file);
    return def;
}