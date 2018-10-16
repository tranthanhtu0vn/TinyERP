import { ISession } from "./isession";

export class Session implements ISession {
    public get(key: string): string {
        let value: string = window.sessionStorage.getItem(key);
        if (String.isNullOrWhiteSpace(value)) {
            return "";
        }
        return JSON.parse(value).value;
    }
    public set(key: string, value: any): void {
        if (!value) {
            value = {};
        }
        window.sessionStorage.setItem(key, JSON.stringify({ value: value }));
    }
    public remove(key: string): void {
        if (String.isNullOrWhiteSpace(key)) {
            return;
        }
        window.sessionStorage.removeItem(key);
    }
}