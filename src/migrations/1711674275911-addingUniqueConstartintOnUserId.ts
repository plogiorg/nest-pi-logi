import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingUniqueConstartintOnUserId1711674275911 implements MigrationInterface {
    name = 'AddingUniqueConstartintOnUserId1711674275911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "UQ_8769073e38c365f315426554ca5" UNIQUE ("user_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "UQ_8769073e38c365f315426554ca5"`);
    }

}
