exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("recipes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("recipes").insert([
        { name: "dishes", dishes_id: 1 },
        { name: "dishes", dishes_id: 1 },
        { name: "dishes", dishes_id: 1 }
      ]);
    });
};
