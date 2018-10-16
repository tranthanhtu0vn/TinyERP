import {Injectable} from "@angular/core";
import {ResourceLoader} from "@angular/compiler";
export class DefaultResourceLoader extends ResourceLoader {
    public get(url: string): Promise<string> {
        console.log("Loading resource for url:", url);
        return super.get(url);
    }
}