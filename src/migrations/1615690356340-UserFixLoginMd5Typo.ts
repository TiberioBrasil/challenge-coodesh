import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserFixLoginMd5Typo1615690356340 implements MigrationInterface {
  name = 'UserFixLoginMd5Typo1615690356340';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "logiMd5" TO "loginMd5"`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."idName" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "idName" SET DEFAULT null`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."idValue" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "idValue" SET DEFAULT null`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "idValue" DROP DEFAULT`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."idValue" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "idName" DROP DEFAULT`,
    );
    await queryRunner.query(`COMMENT ON COLUMN "user"."idName" IS NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" RENAME COLUMN "loginMd5" TO "logiMd5"`,
    );
  }
}
