import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddHobbyToDevelopersTable1645644011129
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'developers',
      new TableColumn({ name: 'hobby', type: 'varchar', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('developers', 'hobby');
  }
}
