"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateLevelsTable1645155818767 = void 0;

var _typeorm = require("typeorm");

class CreateLevelsTable1645155818767 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'levels',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'levelname',
        type: 'varchar'
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('levels');
  }

}

exports.CreateLevelsTable1645155818767 = CreateLevelsTable1645155818767;