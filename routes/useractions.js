const express = require("express");
const router = express.Router();
const { genRandomString } = require("../utils/maths");
const asyncMySQL = require("../mysql/connection");
const {
  addRating,
  addFavourite,
  getUserActionId,
  getUserActionMovie,
  updateAction,
  getUserActionAllIDs,
  checkFavourite,
  checkRating,
  returnUserFavourites,
  returnAverageRating,
} = require("../mysql/queries");

//add a rating or a favourite
router.post("/add", async (req, res) => {
  const { movie_id, favourite, rating } = req.body;

  console.log("1", favourite);

  if (!favourite) {
    try {
      console.log("add rating");
      await asyncMySQL(addRating(req.validatedUserId, movie_id, rating));
      res.send({ status: 1 });
    } catch (error) {
      res.send({ status: 0, reason: error.sqlMessage });
      return;
    }
  } else {
    try {
      console.log("add favourite");
      await asyncMySQL(addFavourite(req.validatedUserId, movie_id, favourite));
      res.send({ status: 1 });
    } catch (error) {
      res.send({ status: 0, reason: error.sqlMessage });
      return;
    }
  }
});

//get user actions by userid & movieid
router.get("/actions/:movieid", async (req, res) => {
  const movieid = req.params.movieid;

  console.log("2", movieid, req.validatedUserId);

  // defensive checks
  // check movieid is a number or not less than 1
  if (Number.isNaN(movieid) || movieid < 1) {
    res.send({ status: 0, reason: "Invalid movieid" });
    return;
  }

  // ask sql for data

  const results = await asyncMySQL(
    getUserActionAllIDs(req.validatedUserId, movieid)
  );

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

//get all user actions by userid
router.get("allUserActions/:id", async (req, res) => {
  console.log("3", req.validatedUserId);

  const userid = Number(req.params.id);
  // console.log(userid);

  //defensive checks
  //check userid is a number or not less than 1
  if (Number.isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  // ask sql for data

  const results = await asyncMySQL(getUserActionId(req.validatedUserId));

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

// get all user actions by movieid
router.get("/movie/:movieid", async (req, res) => {
  console.log("4");
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
router.patch("/update/:movieid", async (req, res) => {
  console.log("5");
  // const userid = Number(req.params.id);
  const movieid = Number(req.params.movieid);

  //check userid is a number
  // if (Number.isNaN(userid) || userid < 1) {
  //   res.send({ status: 0, reason: "Invalid userid" });
  //   return;
  // }

  //check movieid is a number
  if (Number.isNaN(movieid) || movieid < 1) {
    res.send({ status: 0, reason: "Invalid movieid" });
    return;
  }

  const { favourite, rating } = req.body;

  // console.log(typeof rating);
  // console.log(req.body);

  //repetition for security
  try {
    if (rating > -1) {
      await asyncMySQL(
        updateAction("rating", rating, req.validatedUserId, movieid)
      );
    }

    if (favourite > -1) {
      await asyncMySQL(
        updateAction("favourite", favourite, req.validatedUserId, movieid)
      );
    }
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }

  res.send({ status: 1 });
});

//check if user has favourited a film
router.get("/checkFavourite/:movieid", async (req, res) => {
  const movieid = req.params.movieid;

  console.log("6", movieid, req.validatedUserId);

  // defensive checks
  // check movieid is a number or not less than 1
  if (Number.isNaN(movieid) || movieid < 1) {
    res.send({ status: 0, reason: "Invalid movieid" });
    return;
  }

  // ask sql for data

  const results = await asyncMySQL(
    checkFavourite(req.validatedUserId, movieid)
  );

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

//check if user has rated a film
router.get("/checkRating/:movieid", async (req, res) => {
  const movieid = req.params.movieid;

  console.log("7", movieid, req.validatedUserId);

  // defensive checks
  // check movieid is a number or not less than 1
  if (Number.isNaN(movieid) || movieid < 1) {
    res.send({ status: 0, reason: "Invalid movieid" });
    return;
  }

  // ask sql for data

  const results = await asyncMySQL(checkRating(req.validatedUserId, movieid));

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

//return all of the users favourites
router.get("/returnFavourites", async (req, res) => {
  console.log("8");
  // ask sql for data

  const results = await asyncMySQL(returnUserFavourites(req.validatedUserId));

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

//return avgRating for a movie
router.get("/returnAvgRating/:movieid", async (req, res) => {
  const movieid = req.params.movieid;
  console.log("9");
  // ask sql for data

  const results = await asyncMySQL(returnAverageRating(movieid));

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "movieid not found" });
});

module.exports = router;
