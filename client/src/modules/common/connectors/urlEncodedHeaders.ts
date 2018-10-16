import { JsonHeaders } from "./jsonHeaders";

export class UrlEncodedHeaders extends JsonHeaders{
    constructor(requireAuth:boolean = false){
        super(requireAuth);
        this.delete("content-type");
        this.append("content-type", "application/x-www-form-urlencoded");
        //this.append("Access-Control-Allow-Origin","https://tinyerp.com");
    }
}