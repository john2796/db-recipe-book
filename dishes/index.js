const express = require("express");

//init & db
const db = require("../data/dataConfig");
const server = express.Router();

const errHelper = (err, res) => {
  res.status(500).json({ message: `internal error server ${err}` });
};
// pagination
const getAllDishes = async (req, res) => {
  //?&limit=10&page=1&name=etc
  const { limit = 10, page = 1, name } = req.query;
  let dishes;
  try {
    if (!name) {
      dishes = await db
        .select()
        .from("dishes")
        .orderBy("id", "desc")
        .paginate(limit, page, true);
    } else {
      dishes = await db
        .select()
        .from("dishes")
        .orderBy("id", "desc")
        .where("name", "like", `%${name}%`)
        .paginate(limit, page, true);
    }
    res.status(200).json(dishes);
  } catch (err) {
    return errHelper(err, res);
  }
};
// - `getDishes()`: should return a list of all dishes in the database.
server.get("/", (req, res) => {
  getAllDishes(req, res);
});
// - `addDish(dish)`: should add the **dish** to the database and return the `id` of the new **dish**.
server.post("/", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "No Name" });
  }
  try {
    const [id] = await db.insert({ name }).into("dishes");

    if (id) {
      const posted = await db
        .select()
        .from("dishes")
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

// - `getDish(id)`: should return the **dish** with the provided `id` and include a list of the related recipes.
server.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dish = await db
      .select()
      .from("dishes")
      .where({ id })
      .first();

    if (dish) {
      res.status(200).json(dish);
    } else {
      res.status(404).json({ message: "dish not found" });
    }
  } catch (err) {
    return errHelper(err, res);
  }
});

module.exports = server;
