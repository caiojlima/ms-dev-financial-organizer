import { MigrationInterface, QueryRunner } from "typeorm";

export class DropDataFromInventory1790297600000 implements MigrationInterface {
  name = 'DropDataFromInventory1790297600000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "inventory_items" DROP COLUMN "data"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "inventory_items" ADD "data" date NOT NULL DEFAULT CURRENT_DATE`,
    );
  }
}