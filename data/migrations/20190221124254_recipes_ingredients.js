exports.up = function(knex, Promise) {
  return knex.schema.createTable("recipes_ingredients", tbl => {
    tbl
      .integer("recipes_id")
      .notNullable()
      .references("id")
      .inTable("recipes");
    tbl
      .integer("ingredients_id")
      .notNullable()
      .references("id")
      .inTable("ingredients");

    tbl
      .integer("image_id")
      .notNullable()
      .references("id")
      .inTable("images");

    tbl.primary(["recipes_id", "ingredients_id", "image_id"]);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("recipes_ingredients");
};
