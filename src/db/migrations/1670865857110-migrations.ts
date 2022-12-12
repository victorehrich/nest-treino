import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1670865857110 implements MigrationInterface {
    name = 'migrations1670865857110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo_item\` ADD \`done\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`todo_item\` CHANGE \`priority\` \`priority\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo_item\` CHANGE \`priority\` \`priority\` varchar(255) NOT NULL DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE \`todo_item\` DROP COLUMN \`done\``);
    }

}
