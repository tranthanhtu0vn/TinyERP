import sessionStorage from "../storages/sessionStorage";
import { ICacheService } from "./icacheService";
export const CACHE_CONSTANT: any = {
    USER_PROFILE: "USER_PROFILE",
    TOKEN: "TOKEN"
};

export class CacheService implements ICacheService {
    public remove(key: string) {
        sessionStorage.remove(key);
    }
    public exist(key: string): boolean {
        return sessionStorage.exist(key);
    }
    public get(key: string): any {
        return sessionStorage.get(key);
    }
    public set(key: string, data: any): any {
        return sessionStorage.set(key, data);
    }
}
