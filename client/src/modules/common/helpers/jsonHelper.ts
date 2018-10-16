let helper ={
    toJson: toJson,
    toObject: toObject
};
export default helper;
function toObject(json:string):any{
    if(String.isNullOrWhiteSpace(json)){return null;}
    return JSON.parse(json);
}
function toJson(obj: any):string{
    if(!obj){return "";}
    return JSON.stringify(obj);
}