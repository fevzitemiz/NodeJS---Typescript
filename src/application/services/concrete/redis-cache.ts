import ICacheService from "../abstract/icache.service";
import { RedisClientType } from 'redis';

export default class RedisCache implements ICacheService {

    private redisClient: RedisClientType
    constructor(_redisClient: RedisClientType) {
        this.redisClient = _redisClient
    }

    async setCache(key: string, value: string) {
        await this.redisClient.set(key, value);
        await this.redisClient.disconnect()
    }

    async getCache(key: string): Promise<any> {
        let result = this.redisClient.get(key);
        await this.redisClient.disconnect()
        return result
    }

    async removeCache(key: string): Promise<boolean> {
        let result = (await this.redisClient.del(key) == 1 ? true : false);
        await this.redisClient.disconnect()
        return result
    }

}