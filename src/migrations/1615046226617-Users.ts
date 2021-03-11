import {MigrationInterface, QueryRunner} from "typeorm";

export class Users1615046226617 implements MigrationInterface {
    name = 'Users1615046226617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("loginUuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "gender" character varying NOT NULL, "nameTitle" character varying NOT NULL, "nameFirst" character varying NOT NULL, "nameLast" character varying NOT NULL, "locationStreetNumber" integer NOT NULL, "locationStreetName" character varying NOT NULL, "locationCity" character varying NOT NULL, "locationState" character varying NOT NULL, "locationCountry" character varying NOT NULL, "locationPostcode" character varying NOT NULL, "locationCoordinatesLatitude" character varying NOT NULL, "locationCoordinatesLongitude" character varying NOT NULL, "locationTimezoneOffset" character varying NOT NULL, "locationTimezoneDescription" character varying NOT NULL, "email" character varying NOT NULL, "loginUsername" character varying NOT NULL, "loginPassword" character varying NOT NULL, "loginSalt" character varying NOT NULL, "logiMd5" character varying NOT NULL, "loginSha1" character varying NOT NULL, "loginSha256" character varying NOT NULL, "dobDate" TIMESTAMP NOT NULL, "dobAge" integer NOT NULL, "registeredDate" TIMESTAMP NOT NULL, "registeredAge" integer NOT NULL, "phone" character varying NOT NULL, "cell" character varying NOT NULL, "idName" character varying DEFAULT null, "idValue" character varying DEFAULT null, "pictureLarge" character varying NOT NULL, "pictureMedium" character varying NOT NULL, "pictureThumbnail" character varying NOT NULL, "nat" character varying NOT NULL, "imported_t" TIMESTAMP NOT NULL, "status" character varying NOT NULL DEFAULT 'draft', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_42316b72a127d876e9da795f6fe" PRIMARY KEY ("loginUuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
