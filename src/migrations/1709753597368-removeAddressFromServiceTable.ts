import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveAddressFromServiceTable1709753597368 implements MigrationInterface {
    name = 'RemoveAddressFromServiceTable1709753597368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "address"`);
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "city"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "country" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "services" ADD "city" character varying`);
        await queryRunner.query(`ALTER TABLE "services" ADD "address" character varying`);
        await queryRunner.query(`ALTER TABLE "services" ADD "latitude" double precision NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "services" ADD "longitude" double precision NOT NULL DEFAULT '0'`);
    }

}
