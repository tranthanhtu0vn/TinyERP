export class AuthToken {
    public readonly value: string = "";
    public readonly expiredAfter: Date = null;
    public readonly inMiliseconds:number=0;
    constructor(token: string, expiredAfter: Date, inmilisecond: number) {
        this.value = token;
        this.expiredAfter = expiredAfter;
        this.inMiliseconds=inmilisecond;
    }
}