import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1629129833068 implements MigrationInterface {
    name = 'Initial1629129833068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "property" ("_id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying NOT NULL, "text" character varying NOT NULL, "creator_id" integer NOT NULL, CONSTRAINT "PK_2d797bad10764c08596f3c12c9d" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`CREATE TABLE "person" ("_id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying NOT NULL, "password" text NOT NULL, CONSTRAINT "UQ_e4475bde6806df5ab6999b47e5b" UNIQUE ("username"), CONSTRAINT "PK_c50f05539380a692a7c7ff8446c" PRIMARY KEY ("_id"))`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_514d92f8ce6dc98beaa63424ffe" FOREIGN KEY ("creator_id") REFERENCES "person"("_id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_514d92f8ce6dc98beaa63424ffe"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TABLE "property"`);
    }

}
