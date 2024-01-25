import { MigrationInterface, QueryRunner } from "typeorm";

export class todos1678792782678 implements MigrationInterface {
    name = 'todos1678792782678'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."todos_status_enum" AS ENUM('To Do', 'In Progress', 'Complete')`);
        await queryRunner.query(`CREATE TABLE "todos" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "title" character varying NOT NULL, "status" "public"."todos_status_enum" NOT NULL, CONSTRAINT "PK_ca8cafd59ca6faaf67995344225" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c427d5928f463be5c8965e0d68" ON "todos" ("title") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_c427d5928f463be5c8965e0d68"`);
        await queryRunner.query(`DROP TABLE "todos"`);
        await queryRunner.query(`DROP TYPE "public"."todos_status_enum"`);
    }

}
