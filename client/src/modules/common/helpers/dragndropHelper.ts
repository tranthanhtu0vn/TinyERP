import {DragData} from "../components/dragnDrop/dragData";
let helper = {
    isDroppable: isDroppable
};
export default helper;
function isDroppable(selector: any, ev: any) {
    let data: DragData = ev.dataTransfer.getData("dragData");
    if (typeof selector == "function") {
        return selector(data);
    }
    if(typeof selector=="string" && selector.startsWith(".")){
        let cls=selector.substr(1);
        return data.cls.contains(selector);
    }
}