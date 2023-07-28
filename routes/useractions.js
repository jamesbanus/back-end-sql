const express = require("express");
const router = express.Router();
const { genRandomString } = require("../utils/maths");
const asyncMySQL = require("../mysql/connection");
const {
  addRating,
  addFavourite,
  getUserActionId,
  getUserActionMovie,
  updateFavourite,
  updateRating,
} = require("../mysql/queries");

//add a rating or a favourite
router.post("/", async (req, res) => {
  const { user_id, movie_id, favourite, rating } = req.body;

  console.log(favourite);

  if (!favourite) {
    try {
      await asyncMySQL(addRating(user_id, movie_id, rating));
      res.send({ status: 1 });
    } catch (error) {
      res.send({ status: 0, reason: error.sqlMessage });
      return;
    }
  } else {
    try {
      await asyncMySQL(addFavourite(user_id, movie_id, favourite));
      res.send({ status: 1 });
    } catch (error) {
      res.send({ status: 0, reason: error.sqlMessage });
      return;
    }
  }
});

//get user actions by userid
router.get("/:id", async (req, res) => {
  const userid = Number(req.params.id);

  //defensive checks
  //check userid is a number or not less than 1
  if (Number.isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  // ask sql for data

  const results = await asyncMySQL(getUserActionId(userid));

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

// get all user actions by movieid
router.get("/movie/:movieid", async (req, res) => {
  const movieid = Number(req.params.movieid);

  //defensive checks
  //check userid is a number or not less than 1
  if (Number.isNaN(movieid) || movieid < 1) {
    res.send({ status: 0, reason: "Invalid movieid" });
    return;
  }

  // ask sql for data

  const results = await asyncMySQL(getUserActionMovie(movieid));

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

//update favourite & rating
router.patch("/:id/:movieid", async (req, res) => {
  const userid = Number(req.params.id);
  const movieid = Number(req.params.movieid);

  //check userid is a number
  if (Number.isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  //check movieid is a number
  if (Number.isNaN(movieid) || movieid < 1) {
    res.send({ status: 0, reason: "Invalid movieid" });
    return;
  }

  const { favourite, rating } = req.body;

  console.log(typeof rating);

  //repetition for security
  try {
    if (rating > -1) {
      await asyncMySQL(updateRating(rating, userid, movieid));
    }

    if (favourite > -1) {
      await asyncMySQL(updateFavourite(favourite, userid, movieid));
    }
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }

  res.send({ status: 1 });
});

module.exports = router;
