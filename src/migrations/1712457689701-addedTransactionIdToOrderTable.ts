import { MigrationInterface, QueryRunner } from "typeorm";

export class AddedTransactionIdToOrderTable1712457689701 implements MigrationInterface {
    name = 'AddedTransactionIdToOrderTable1712457689701'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promote_orders" ADD "transaction_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "promote_orders" DROP COLUMN "transaction_id"`);
    }

}
