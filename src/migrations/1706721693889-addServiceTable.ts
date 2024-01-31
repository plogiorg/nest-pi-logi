import { MigrationInterface, QueryRunner } from "typeorm";

export class AddServiceTable1706721693889 implements MigrationInterface {
    name = 'AddServiceTable1706721693889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "services_types" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_7cf0b72d9dacbbaa7c904670ee7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "title"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "is_active"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "price" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "is_deleted" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "is_deleted"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "price"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "is_active" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "services" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "services" ADD "title" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "services_types"`);
    }

}
