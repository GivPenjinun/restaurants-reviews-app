require("dotenv").config();
const express = require("express");
const db = require("./db");
const cors = require("cors");
var morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());

//Get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    //const results = await db.query("SELECT * FROM restaurants");
    const restaurantRatingData = await db.query(
      "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id"
    );
    res.status(200).json({
      status: "success",
      results: restaurantRatingData.rows.length,
      data: {
        restaurants: restaurantRatingData.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    /* const results = await db.query(`SELECT * FROM restaurants WHERE id = $1`, [
      req.params.id,
    ]);*/

    const results = await db.query(
      `select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1) as average_rating from reviews group by restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1`,
      [req.params.id]
    );

    const reviews = await db.query(
      `SELECT * FROM reviews WHERE restaurant_id = $1`,
      [req.params.id]
    );

    res.status(200).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  console.log(req);
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) values($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(201).json({
      status: "success",
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

//update a restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(200).json({
      status: "success",
      data: results.rows[0],
    });
  } catch (err) {
    console.log(err);
  }
});

//delete a restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants where id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
  }
});

//Create a review
app.post("/api/v1/restaurants/:id/addReview", async (req, res) => {
  console.log(req);
  try {
    const results = await db.query(
      "INSERT INTO reviews (restaurant_id, name, review, rating) values($1, $2, $3, $4) RETURNING *",
      [req.params.id, req.body.name, req.body.review, req.body.rating]
    );
    res.status(201).json({
      status: "success",
      data: {
        review: results.rows[0],
      },
    });
  } catch (err) {
    console.log(err);
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is up and listen on port ${port}`);
});
