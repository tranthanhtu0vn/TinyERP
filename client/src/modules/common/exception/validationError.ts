export class ValidationError {
    constructor(key: string, params: any) {
        this.key = key;
        this.params = params;
        this.msg = String.empty;
    }
    public key: string = undefined;
    public params: any = {};
    public msg: string = String.empty;
}