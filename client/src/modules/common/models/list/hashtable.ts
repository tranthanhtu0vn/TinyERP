export class Hashtable<T> {
    public data: any = {};
    public getKeys(): Array<string> {
        let keys: Array<string> = [];
        for (let key in this.data) {
            keys.push(key);
        }
        return keys;
    }
    public set(key: string, data: T) {
        this.data[key] = data;
    }
    public exist(key: string): boolean {
        return !!this.data[key];
    }
    public get(key: string): T {
        if (!this.exist(key)) {
            throw key + " value was not exist in Hashtable";
        }
        return this.data[key];
    }
    public remove(key: string) {
        delete this.data[key];
    }
    public clear():void{
        this.data={};
    }
    public import(items:Array<T>, predicate: (arg:T)=>string):Hashtable<T>{
        let self=this;
        items.forEach((item:T)=>{
            let key:string=predicate(item);
            self.set(key, item);
        });
        return this;
    }
    public toArray(prediacte: (key:string, item:T)=>any):Array<T>{
        let keys:Array<string>=this.getKeys();
        let self=this;
        let result:Array<T>=[];
        keys.forEach((key:string)=>{
            if(!prediacte(key, self.get(key))){return;}
            result.push(self.get(key));
        });
        return result;
    }
}