import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateExperienceTable1771319900703 implements MigrationInterface {
  name = 'CreateExperienceTable1771319900703';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "experiences" ("id" SERIAL NOT NULL, "company" character varying NOT NULL, "position" character varying NOT NULL, "description" text NOT NULL, "location" character varying, "startDate" date NOT NULL, "endDate" date, "isCurrent" boolean NOT NULL DEFAULT false, "order" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_884f0913a63882712ea578e7c85" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "experiences"`);
  }
}
