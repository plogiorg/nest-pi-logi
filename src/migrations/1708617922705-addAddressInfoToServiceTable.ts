import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressInfoToServiceTable1708617922705 implements MigrationInterface {
    name = 'AddAddressInfoToServiceTable1708617922705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "longitude" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "services" ADD "longitude" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "services" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "services" ADD "city" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "longitude"`);
    }

}
