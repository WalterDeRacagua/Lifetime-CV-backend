import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContactMessageTable1771330131702 implements MigrationInterface {
  name = 'CreateContactMessageTable1771330131702';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "contact_messages" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "subject" character varying NOT NULL, "message" text NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_b74f96eb2edd977ccfba6533293" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "contact_messages"`);
  }
}
