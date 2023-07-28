const express = require("express");
const router = express.Router();
const { genRandomString } = require("../utils/maths");

//add a user

router.post("/user", (req, res) => {
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

  //check for duplicates
  const indexOf = req.userData.findIndex((item) => {
    return item.name === name || item.email === email;
  });

  if (indexOf > -1) {
    res.send({ status: 0, reason: "Duplicate Entry" });
    return;
  }

  req.userData.push({ userid: genRandomString(), name, email, password });

  res.send({ status: 1 });
});

//add a favourite

router.post("/favourite", (req, res) => {
  const { favourite, userid, movieid } = req.body;
  let { rating } = req.body;

  //check contents
  if (typeof favourite !== "boolean") {
    res.send({ status: 0, reason: "Incomplete Request" });
    return;
  }

  //check for duplicates
  const indexOf = req.userActions.findIndex((item) => {
    return item.userid === userid && item.movieid === movieid;
  });

  if (indexOf > -1) {
    res.send({ status: 0, reason: "Duplicate Entry" });
    return;
  }

  rating = 0;

  req.userActions.push({
    userid,
    movieid,
    favourite,
    rating,
  });

  res.send({ status: 1 });
});

//add a rating

router.post("/rating", (req, res) => {
  const { rating, userid, movieid } = req.body;
  let { favourite } = req.body;

  //check contents
  if (!rating || typeof rating !== "number") {
    res.send({ status: 0, reason: "Incomplete Request" });
    return;
  }

  //check for duplicates
  const indexOf = req.userActions.findIndex((item) => {
    return item.userid === userid && item.movieid === movieid;
  });

  if (indexOf > -1) {
    res.send({ status: 0, reason: "Duplicate Entry" });
    return;
  }

  favourite = false;

  req.userActions.push({
    userid,
    movieid,
    favourite,
    rating,
  });

  res.send({ status: 1 });
});

module.exports = router;
