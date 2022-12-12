import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1670866740952 implements MigrationInterface {
    name = 'migrations1670866740952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo_list\` DROP FOREIGN KEY \`FK_0ccba8168dcb33ca73fd63e0c73\``);
        await queryRunner.query(`ALTER TABLE \`todo_item\` DROP FOREIGN KEY \`FK_3aba7e189db12c46ca339996459\``);
        await queryRunner.query(`ALTER TABLE \`todo_list\` ADD CONSTRAINT \`FK_0ccba8168dcb33ca73fd63e0c73\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`todo_item\` ADD CONSTRAINT \`FK_3aba7e189db12c46ca339996459\` FOREIGN KEY (\`todoListId\`) REFERENCES \`todo_list\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo_item\` DROP FOREIGN KEY \`FK_3aba7e189db12c46ca339996459\``);
        await queryRunner.query(`ALTER TABLE \`todo_list\` DROP FOREIGN KEY \`FK_0ccba8168dcb33ca73fd63e0c73\``);
        await queryRunner.query(`ALTER TABLE \`todo_item\` ADD CONSTRAINT \`FK_3aba7e189db12c46ca339996459\` FOREIGN KEY (\`todoListId\`) REFERENCES \`todo_list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`todo_list\` ADD CONSTRAINT \`FK_0ccba8168dcb33ca73fd63e0c73\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
