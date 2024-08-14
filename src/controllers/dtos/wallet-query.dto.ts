import { Type } from "class-transformer";
import { IsOptional, IsNumber, IsDateString, IsInt, Min } from "class-validator";

export class WalletQuery {
    @IsOptional()
    @IsDateString({}, { message: 'start deve ser uma data válida' })
    start?: string;
  
    @IsOptional()
    @IsDateString({}, { message: 'end deve ser uma data válida' })
    end?: string;
  
    @IsOptional()
    @IsInt({ message: 'page deve ser um número inteiro' })
    @Min(1, { message: 'page deve ser pelo menos 1' })
    @Type(() => Number)
    page?: number = 1;
  
    @IsOptional()
    @IsInt({ message: 'limit deve ser um número inteiro' })
    @Min(1, { message: 'limit deve ser pelo menos 1' })
    @Type(() => Number)
    limit?: number = 10;
  }