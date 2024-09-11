import { MigrationInterface, QueryRunner } from "typeorm";

export class AddInitialTables1726088117917 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
CREATE TABLE "user" (
    "id" INTEGER PRIMARY KEY
);

CREATE TABLE "user_watchlist_item" (
    "id" INTEGER PRIMARY KEY,
    "stockSymbol" TEXT NOT NULL,
    "userId" INTEGER,
    FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE
);
`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
DROP TABLE "user_watchlist_item";
DROP TABLE "user";
        `)
    }
}
