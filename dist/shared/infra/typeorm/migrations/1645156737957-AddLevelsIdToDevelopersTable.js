"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AddLevelsIdToDevelopersTable1645156737957 = void 0;

var _typeorm = require("typeorm");

class AddLevelsIdToDevelopersTable1645156737957 {
  async up(queryRunner) {
    await queryRunner.addColumn('developers', new _typeorm.TableColumn({
      name: 'level_id',
      type: 'integer',
      isNullable: false
    }));
    await queryRunner.createForeignKey('developers', new _typeorm.TableForeignKey({
      columnNames: ['level_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'levels',
      name: 'DeveloperLevel_fk',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('developers', 'DeveloperLevel_fk');
    await queryRunner.dropColumn('developers', 'level_id');
  }

}

exports.AddLevelsIdToDevelopersTable1645156737957 = AddLevelsIdToDevelopersTable1645156737957;