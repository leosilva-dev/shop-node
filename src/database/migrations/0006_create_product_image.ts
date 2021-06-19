import { Knex } from "knex";

import { TableNames } from "../TableNames";

export async function up(knex: Knex) {
  return knex.schema.createTable(TableNames.productImage, table => {
    table.bigIncrements('id').primary();

    table.bigInteger('imageId').references('id').inTable(TableNames.image).notNullable();
    table.bigInteger('productId').references('id').inTable(TableNames.product).notNullable();
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(TableNames.productImage);
}