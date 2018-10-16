let helper={
    objectToString: objectToString
};
export default helper;
function objectToString(data: any){
    if(!data){ return String.empty;}
    if(window.Sys.isString(data)){return data;}
    let result:Array<string>=[];
    let json = data.toJSON();
    for(var pro in  json){
        result.push(String.format("{0}={1}", pro, json[pro]));
    }
    return result.join("&");
}