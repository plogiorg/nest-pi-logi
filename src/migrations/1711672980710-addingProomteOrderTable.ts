import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingProomteOrderTable1711672980710 implements MigrationInterface {
    name = 'AddingProomteOrderTable1711672980710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "promote_orders" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "pi_payment_id" character varying NOT NULL, "service_id" integer NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "price" double precision NOT NULL, CONSTRAINT "PK_7bfe6f8b9c9b080ac3d8eecdf00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "services" ADD "is_promoted" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "promote_orders" ADD CONSTRAINT "FK_5f1e601a74c73fbcc105df1c5ca" FOREIGN KEY ("service_id") REFERENCES "services"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promote_orders" DROP CONSTRAINT "FK_5f1e601a74c73fbcc105df1c5ca"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "is_promoted"`);
        await queryRunner.query(`DROP TABLE "promote_orders"`);
    }

}
