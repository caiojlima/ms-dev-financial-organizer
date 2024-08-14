import { Wallet } from "src/models";
import { FindOptionsWhere, Between } from "typeorm";

export class WalletCriteriaBuilder {
    private where: FindOptionsWhere<Wallet> = {};
  
    constructor(private filters: {
      userId?: number;
      start?: string;
      end?: string;
    }) {}
  
    build(): FindOptionsWhere<Wallet> {
      const { start, end }  = this.filters

      this.where = {
        user: { id: this.filters?.userId }!,
        createdAt: (start && end) && Between(new Date(start), new Date(end))
      }
  
      return this.where;
    }
  }