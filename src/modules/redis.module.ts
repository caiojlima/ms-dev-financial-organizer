import { Module } from "@nestjs/common";
import { RedisService } from "src/services";

@Module({
    providers: [RedisService],
    exports: [RedisService],
})
export class RedisModule {}