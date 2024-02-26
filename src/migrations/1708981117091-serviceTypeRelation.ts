import { MigrationInterface, QueryRunner } from "typeorm";

export class ServiceTypeRelation1708981117091 implements MigrationInterface {
    name = 'ServiceTypeRelation1708981117091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_70d400878cfc6cf1a8dcfcdcf66"`);
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "UQ_70d400878cfc6cf1a8dcfcdcf66"`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_70d400878cfc6cf1a8dcfcdcf66" FOREIGN KEY ("service_type_id") REFERENCES "services_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" DROP CONSTRAINT "FK_70d400878cfc6cf1a8dcfcdcf66"`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "UQ_70d400878cfc6cf1a8dcfcdcf66" UNIQUE ("service_type_id")`);
        await queryRunner.query(`ALTER TABLE "services" ADD CONSTRAINT "FK_70d400878cfc6cf1a8dcfcdcf66" FOREIGN KEY ("service_type_id") REFERENCES "services_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
