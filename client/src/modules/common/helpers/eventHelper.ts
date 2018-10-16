import {IEventListener} from "../event/ieventListener";
let helper={
    addEventListener: addEventListener
};
export default helper;
function addEventListener(event: IEventListener):void{
    let target: any = event.target;
    let eventName:string = event.eventName;
    if(!target || !target.addEventListener){
        throw "target object did not have addEventListener method";
    }
    window.jQuery(target).on(eventName, function(){
        event.execute(target);
    });
    // $(window).on(evname, handler);
    // target.addEventListener(eventName, function(){
    //     event.execute(target);
    // });

}