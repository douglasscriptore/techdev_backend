import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddLevelsIdToDevelopersTable1645156737957
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'developers',
      new TableColumn({ name: 'level_id', type: 'integer', isNullable: false }),
    );

    await queryRunner.createForeignKey(
      'developers',
      new TableForeignKey({
        columnNames: ['level_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'levels',
        name: 'DeveloperLevel_fk',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('developers', 'DeveloperLevel_fk');
    await queryRunner.dropColumn('developers', 'level_id');
  }
}
