// src/modules/inventory.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryItem } from '../models/inventory-item.entity';
import { InventoryService } from '../services/inventory.service';
import { InventoryController } from '../controllers/inventory.controller';
import { InventoryMapper } from '../mappers/inventory.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([InventoryItem])],
  controllers: [InventoryController],
  providers: [InventoryService, InventoryMapper],
  exports: [InventoryService],
})
export class InventoryModule {}