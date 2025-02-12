export default interface ICacheService {
    setCache(key: string, value: string): void;
    getCache(key: string): Promise<string | null>;
    removeCache(key: string): Promise<boolean>;
}