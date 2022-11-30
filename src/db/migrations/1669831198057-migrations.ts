import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1669831198057 implements MigrationInterface {
  name = 'migrations1669831198057';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`todo_item\` (\`id\` int NOT NULL AUTO_INCREMENT, \`description\` varchar(255) NOT NULL, \`priority\` varchar(255) NOT NULL DEFAULT 1, \`todoListId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`todo_list\` (\`id\` int NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`todo_item\` ADD CONSTRAINT \`FK_3aba7e189db12c46ca339996459\` FOREIGN KEY (\`todoListId\`) REFERENCES \`todo_list\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`todo_list\` ADD CONSTRAINT \`FK_0ccba8168dcb33ca73fd63e0c73\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`todo_list\` DROP FOREIGN KEY \`FK_0ccba8168dcb33ca73fd63e0c73\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`todo_item\` DROP FOREIGN KEY \`FK_3aba7e189db12c46ca339996459\``,
    );
    await queryRunner.query(`DROP TABLE \`todo_list\``);
    await queryRunner.query(`DROP TABLE \`todo_item\``);
  }
}
