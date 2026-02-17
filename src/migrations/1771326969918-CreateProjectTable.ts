import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateProjectTable1771326969918 implements MigrationInterface {
  name = 'CreateProjectTable1771326969918';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" text NOT NULL, "technologies" text NOT NULL, "demoUrl" character varying, "githubUrl" character varying, "imageUrls" text, "featured" boolean NOT NULL DEFAULT false, "order" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "projects"`);
  }
}
