const express = require("express");

//init & db
const db = require("../data/dataConfig");
const server = express.Router();

const errHelper = (err, res) => {
  res.status(500).json({ message: `internal error server ${err}` });
};

// - `getRecipes()`: should return a list of all recipes in the database including the **dish** they belong to.
server.get("/", async (req, res) => {
  const { limit = 10, page = 1, name } = req.query;
  try {
    let dishes = await db.select().from("dishes");

    const results = dishes.map(async dish => {
      const recipes = await db
        .select()
        .from("recipes")
        .orderBy("id", "desc")
        .where({ dishes_id: dish.id });

      dish.recipes = recipes;
      return dish;
    });

    Promise.all(results).then(completed => {
      dishes = completed;
      res.status(200).json(dishes);
    });
  } catch (err) {
    return errHelper(err, res);
  }
});
// - `addRecipe(recipe)`: should add a **recipe** to the database and return the `id` of the new **recipe**.
server.post("/:id", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  if (!name) {
    return res.status(400).json({ message: "No Name" });
  }
  try {
    const [newRecipe] = await db
      .insert({ name, dishes_id: id })
      .into("recipes");

    if (newRecipe) {
      const posted = await db
        .select()
        .from("recipes")
        .where({ id })
        .first();

      res.status(200).json(posted);
    } else {
      res.status(404).json({ message: "dishes with that id is not found" });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});

module.exports = server;
