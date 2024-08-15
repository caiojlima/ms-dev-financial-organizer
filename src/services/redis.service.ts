import { Injectable } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST,
      port: Number(process.env.REDIS_PORT),
      password: process.env.REDIS_PASSWORD,
    });
  }

  async set(key: string, value: string, expireInSeconds: number): Promise<void> {
    await this.redisClient.set(key, value, 'EX', expireInSeconds);
  }

  async get(key: string): Promise<string | null> {
    return this.redisClient.get(key);
  }

  async del(key: string): Promise<void> {
    await this.redisClient.del(key);
  }
}