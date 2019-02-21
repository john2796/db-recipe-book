exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("dishes")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("dishes").insert([
        { name: "dishes 1" },
        { name: "dishes 2" },
        { name: "dishes 3" },
        { name: "dishes 4" },
        { name: "dishes 5" },
        { name: "dishes 6" },
        { name: "dishes 7" },
        { name: "dishes 8" },
        { name: "dishes 9" },
        { name: "dishes 10" },
        { name: "dishes 11" },
        { name: "dishes 12" },
        { name: "dishes 13" },
        { name: "dishes 14" },
        { name: "dishes 15" },
        { name: "dishes 16" },
        { name: "dishes 17" },
        { name: "dishes 18" },
        { name: "dishes 19" },
        { name: "dishes 20" },
        { name: "dishes 21" },
        { name: "dishes 22" },
        { name: "dishes 23" },
        { name: "dishes 24" },
        { name: "dishes 25" },
        { name: "dishes 26" }
      ]);
    });
};
