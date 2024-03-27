import { MigrationInterface, QueryRunner } from "typeorm";

export class AddingTokenEntity1711564540186 implements MigrationInterface {
    name = 'AddingTokenEntity1711564540186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tokens_user_type_enum" AS ENUM('admin', 'provider', 'user')`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "access_token" character varying NOT NULL, "username" character varying NOT NULL, "user_id" character varying NOT NULL, "user_type" "public"."tokens_user_type_enum" NOT NULL DEFAULT 'provider', CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TYPE "public"."tokens_user_type_enum"`);
    }

}
