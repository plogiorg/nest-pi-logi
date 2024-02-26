import { MigrationInterface, QueryRunner } from "typeorm";

export class IsDeletedDefaultValue1708980536314 implements MigrationInterface {
    name = 'IsDeletedDefaultValue1708980536314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "is_deleted" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "services" ALTER COLUMN "is_deleted" DROP DEFAULT`);
    }

}
