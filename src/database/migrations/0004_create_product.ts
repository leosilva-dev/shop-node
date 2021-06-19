import {Knex} from 'knex';

import { TableNames} from '../TableNames'


export async function up(knex: Knex) {
    return knex.schema.createTable(TableNames.product, table => {
        table.bigIncrements('id').primary();
        table.string('category').nullable();
        table.string('description').notNullable();
        table.float('discount').notNullable();
        table.integer('stock').notNullable();
        table.float('price').notNullable();
    })
}

export async function down(knex: Knex){
    return knex.schema.dropTable(TableNames.product)
}