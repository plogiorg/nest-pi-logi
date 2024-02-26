import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAddressInfoToServiceTable1708617922705 implements MigrationInterface {
    name = 'AddAddressInfoToServiceTable1708617922705'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ADD "longitude" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "services" ADD "latitude" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "services" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "services" ADD "city" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "longitude"`);
    }

}
