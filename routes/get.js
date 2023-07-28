const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");

//get all users
router.get("/users", async (req, res) => {
  const results = await asyncMySQL(
    `SELECT *
      FROM users;`
  );

  res.send({ status: 1, results });
});

//get user by id
router.get("/user/:id", async (req, res) => {
  const userid = Number(req.params.id);

  //defensive checks

  //check userid is a number or not less than 1
  if (Number.isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  // ask sql for data

  const results = await asyncMySQL(
    `SELECT * 
      FROM users 
        WHERE id LIKE ${userid};`
  );

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

//get all user actions
router.get("/useractions", async (req, res) => {
  const results = await asyncMySQL(
    `SELECT *
      FROM user_actions;`
  );

  res.send({ status: 1, results });
});

//get user actions by userid
router.get("/useractions/:id", async (req, res) => {
  const userid = Number(req.params.id);

  //defensive checks
  //check userid is a number or not less than 1
  if (Number.isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  // ask sql for data

  const results = await asyncMySQL(
    `SELECT * 
      FROM user_actions 
        WHERE user_id LIKE ${userid};`
  );

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

// get all user actions by movieid
router.get("/useractionsmovie/:movieid", async (req, res) => {
  const movieid = Number(req.params.movieid);

  //defensive checks
  //check userid is a number or not less than 1
  if (Number.isNaN(movieid) || movieid < 1) {
    res.send({ status: 0, reason: "Invalid movieid" });
    return;
  }

  // ask sql for data

  const results = await asyncMySQL(
    `SELECT * 
      FROM user_actions 
        WHERE movie_id LIKE ${movieid};`
  );

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

module.exports = router;
