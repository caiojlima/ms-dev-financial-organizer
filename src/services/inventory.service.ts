// src/services/inventory.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryItem } from '../models/inventory-item.entity';
import { CreateInventoryRequest } from '../controllers/dtos/create-inventory-request.dto';
import { AllInventoryResponse } from '../controllers/dtos/all-inventory.dto';
import { InventoryMapper } from '../mappers/inventory.mapper';
import { CreateInventoryResponse } from 'src/controllers/dtos/create-inventory-response.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(InventoryItem)
    private readonly repo: Repository<InventoryItem>,
    private readonly mapper: InventoryMapper,
  ) {}

  async findAllByUser(userId: number): Promise<AllInventoryResponse> {
    const items = await this.repo.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC', id: 'DESC' },
    });

    const totalGramas = items.reduce((sum, i) => sum + i.quantidadeGramas, 0);

    return {
      items: this.mapper.toResponseList(items),
      totalGramas,
    };
  }

// src/services/inventory.service.ts
async create(
  dto: CreateInventoryRequest,
  userId: number,
): Promise<CreateInventoryResponse> {
  const entity = this.repo.create({
    descricao: dto.descricao,
    quantidadeGramas: dto.quantidadeGramas,
    user: { id: userId } as any,
  });

  const saved = await this.repo.save(entity);
  return this.mapper.toResponse(saved);
}

async update(
  id: number,
  dto: Partial<CreateInventoryRequest>,
  userId: number,
): Promise<CreateInventoryResponse> {
  const item = await this.repo.findOne({
    where: { id, user: { id: userId } },
  });
  if (!item) throw new NotFoundException('Item não encontrado');

  if (dto.descricao !== undefined) item.descricao = dto.descricao;
  if (dto.quantidadeGramas !== undefined)
    item.quantidadeGramas = dto.quantidadeGramas;

  const saved = await this.repo.save(item);
  return this.mapper.toResponse(saved);
}

  async remove(id: number, userId: number): Promise<void> {
    const result = await this.repo.delete({ id, user: { id: userId } });
    if (result.affected === 0) throw new NotFoundException('Item não encontrado');
  }
}