// src/controllers/inventory.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Req,
  UseGuards,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { InventoryService } from '../services/inventory.service';
import { CreateInventoryRequest } from './dtos/create-inventory-request.dto';
import {
  ApiFindAllInventory,
  ApiCreateInventory,
  ApiUpdateInventory,
  ApiDeleteInventory,
} from './docs/inventory.docs';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesGuard } from 'src/guards/admin.guard';
import { JwtAuthGuard } from 'src/guards/jwt.guard';

@ApiTags('Inventory')          // ← garante que aparece no grupo
@ApiBearerAuth()               // ← cadeado do "Authorize" aparece
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('estoque')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}

  @Get()
  @ApiFindAllInventory()
  findAll(@Req() req) {
    return this.service.findAllByUser(req.user.sub);
  }

  @Post()
  @ApiCreateInventory()
  create(@Body() dto: CreateInventoryRequest, @Req() req) {
    return this.service.create(dto, req.user.sub);
  }

  @Patch(':id')
  @ApiUpdateInventory()
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: Partial<CreateInventoryRequest>,
    @Req() req,
  ) {
    return this.service.update(id, dto, req.user.sub);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiDeleteInventory()
  remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.service.remove(id, req.user.sub);
  }
}