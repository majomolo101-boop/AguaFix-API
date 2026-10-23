import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhotoFields1792300342333 implements MigrationInterface {
    name = 'AddPhotoFields1792300342333'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" ADD "photo_url" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" ADD "repair_photo_url" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" DROP COLUMN "repair_photo_url"`);
        await queryRunner.query(`ALTER TABLE "WATER_REPORT" DROP COLUMN "photo_url"`);
    }

}
