import { MigrationInterface, QueryRunner } from "typeorm";

export class AddRoleAndInventory1790297521231 implements MigrationInterface {
  name = 'AddRoleAndInventory1790297521231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."users_role_enum" AS ENUM('user', 'admin', 'estoque')`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "role" "public"."users_role_enum" NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(`
      CREATE TABLE "inventory_items" (
        "id" SERIAL NOT NULL,
        "descricao" character varying(255) NOT NULL,
        "quantidade_gramas" integer NOT NULL,
        "data" date NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
        "user_id" integer,
        CONSTRAINT "PK_cf2f451407242e132547ac19169" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "inventory_items"
      ADD CONSTRAINT "FK_9368646c6eb55675ed34699583b"
      FOREIGN KEY ("user_id") REFERENCES "users"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "inventory_items" DROP CONSTRAINT "FK_9368646c6eb55675ed34699583b"`,
    );
    await queryRunner.query(`DROP TABLE "inventory_items"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
    await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
  }
}