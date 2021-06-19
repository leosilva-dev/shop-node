import { Knex } from "knex";

import { TableNames } from "../TableNames";

export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.image, table => {
    table.bigIncrements('id').primary();
    table.string('name').notNullable();
    table.string('type').notNullable();
    table.string('content').notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.image);
}