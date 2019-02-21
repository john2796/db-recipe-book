exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes", tbl => {
    tbl.increments(); //primary id
    tbl
      .integer("dishes_id")
      .notNullable()
      .references("id")
      .inTable("dishes");

    tbl.string("name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("recipes");
};
