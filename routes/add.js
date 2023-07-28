const express = require("express");
const router = express.Router();
const { genRandomString } = require("../utils/maths");
const asyncMySQL = require("../mysql/connection");

//add a user

router.post("/user", async (req, res) => {
  const { name, email, password } = req.body;

  //check contents
  if (
    !name ||
    !email ||
    !password ||
    typeof name !== "string" ||
    typeof email !== "string"
  ) {
    res.send({ status: 0, reason: "Incomplete Request" });
    return;
  }

  try {
    await asyncMySQL(`INSERT INTO users
                      (name, email, password) 
                        VALUES 
                          ("${name}", "${email}", "${password}")`);
    res.send({ status: 1 });
  } catch (error) {
    res.send({ status: 0, reason: "Duplicate entry" });
    return;
  }
});

//add a favourite

router.post("/favourite", async (req, res) => {
  const { favourite, user_id, movie_id } = req.body;

  try {
    await asyncMySQL(`INSERT INTO user_actions
                      (user_id, movie_id, favourite, rating) 
                        VALUES 
                          ("${user_id}", "${movie_id}", "${favourite}", "0")`);
    res.send({ status: 1 });
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

//add a rating

router.post("/rating", async (req, res) => {
  const { rating, user_id, movie_id } = req.body;

  try {
    await asyncMySQL(`INSERT INTO user_actions
                      (user_id, movie_id, favourite, rating) 
                        VALUES 
                          ("${user_id}", "${movie_id}", "0", "${rating}")`);
    res.send({ status: 1 });
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }
});

module.exports = router;
