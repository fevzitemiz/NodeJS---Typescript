import { createClient } from 'redis';
import "dotenv/config"

const redisClient = createClient({ url: process.env.REDIS_CONNECTION, password: process.env.REDIS_PASS });
redisClient.on('error', (err) => console.log('Redis Client Error', err));

export default redisClient