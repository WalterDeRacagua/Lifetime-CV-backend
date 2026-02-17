import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSkillTable1771328818933 implements MigrationInterface {
  name = 'CreateSkillTable1771328818933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "skills" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "category" character varying NOT NULL, "level" integer NOT NULL DEFAULT '0', "iconUrl" character varying, "order" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0d3212120f4ecedf90864d7e298" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "skills"`);
  }
}
