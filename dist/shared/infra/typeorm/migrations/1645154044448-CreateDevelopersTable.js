"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateDevelopersTable1645154044448 = void 0;

var _typeorm = require("typeorm");

class CreateDevelopersTable1645154044448 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'developers',
      columns: [{
        name: 'id',
        type: 'int',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      }, {
        name: 'fullname',
        type: 'varchar'
      }, {
        name: 'gender',
        type: 'enum',
        enum: ['masculino', 'feminino', 'outro']
      }, {
        name: 'dateofborn',
        type: 'timestamp'
      }, {
        name: 'age',
        type: 'int'
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
    await queryRunner.dropTable('developers');
  }

}

exports.CreateDevelopersTable1645154044448 = CreateDevelopersTable1645154044448;