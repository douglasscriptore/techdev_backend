import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDevelopersTable1645154044448 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'developers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'fullname',
            type: 'varchar',
          },
          {
            name: 'gender',
            type: 'enum',
            enum: ['masculino', 'feminino', 'outro'],
          },
          {
            name: 'dateofborn',
            type: 'timestamp',
          },
          {
            name: 'age',
            type: 'int',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('developers');
  }
}
