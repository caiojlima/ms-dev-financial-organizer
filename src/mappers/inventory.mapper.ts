// src/mappers/inventory.mapper.ts
import { Injectable } from '@nestjs/common';
import { InventoryItem } from '../models/inventory-item.entity';
import { CreateInventoryResponse } from '../controllers/dtos/create-inventory-response.dto';

@Injectable()
export class InventoryMapper {
    // src/mappers/inventory.mapper.ts
    toResponse(entity: InventoryItem): CreateInventoryResponse {
    return {
        id: entity.id,
        descricao: entity.descricao,
        quantidadeGramas: entity.quantidadeGramas,
        createdAt: entity.createdAt.toISOString(),
        updatedAt: entity.updatedAt.toISOString(),
    };
    }

  toResponseList(entities: InventoryItem[]): CreateInventoryResponse[] {
    return entities.map((e) => this.toResponse(e));
  }
}