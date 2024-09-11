import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserSeedData1726090192425 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "user" ("id") VALUES (1);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            TRUNCATE TABLE "user";
        `);
    }
}
