const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");
const {
  addUser,
  deleteUser,
  deleteUserActions,
  getUser,
  updateUser,
  checkUserCreds,
  addToken,
  returnAverageRating,
  returnAllAverageRating,
  deleteUserTokens,
} = require("../mysql/queries");
const sha256 = require("sha256");
const { genRandomString } = require("../utils/maths");

//login
router.post("/login", async (req, res) => {
  console.log("account 1");
  const { email, password } = req.body;
  // console.log(email, password);

  //hash the password
  const sha256Password = sha256(password + "secret_Key");

  //compare versions
  try {
    const results = await asyncMySQL(checkUserCreds(email, sha256Password));
    // console.log(results);
    if (results.length > 0) {
      const token = genRandomString(128);

      await asyncMySQL(addToken(results[0].id, token));

      res.send({ status: 1, token });
    } else {
      res.send({ status: 0, reason: "Bad creds" });
    }
  } catch (e) {
    res.send({ status: 0, reason: e });
  }
});

//add a user
router.post("/register", async (req, res) => {
  console.log("account 2");
  const { email, password } = req.body;

  if (!email || !password || typeof email !== "string") {
    res.send({ status: 0, reason: "Incomplete Request" });
    return;
  }

  // store user in database

  try {
    const sha256Password = sha256(password + "secret_Key");

    const result = await asyncMySQL(addUser(email, sha256Password));

    const token = genRandomString(128);

    await asyncMySQL(addToken(result.insertId, token));

    res.send({ status: 1, userID: result.insertId, token });
  } catch (e) {
    res.send({ status: 2, error: e });
  }
});

// delete a user and their actions
router.delete("/delete/:id", async (req, res) => {
  console.log("account 3");
  const userid = Number(req.params.id);

  //defensive checks
  //check userid is a number or not less than 1
  if (isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  // delete user
  await asyncMySQL(deleteUser(userid));

  //delete associated actions
  await asyncMySQL(deleteUserActions(userid));
  await asyncMySQL(deleteUserTokens(userid));

  res.send({ status: 1 });
});

//get user by id
router.get("/get/:id", async (req, res) => {
  console.log("account 4");
  const userid = Number(req.params.id);

  //defensive checks

  //check userid is a number or not less than 1
  if (Number.isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  // ask sql for data

  const results = await asyncMySQL(getUser(userid));

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "userid not found" });
});

//update user
router.patch("/patch/:id", async (req, res) => {
  console.log("account 5");
  const userid = Number(req.params.id);

  //check userid is a number
  if (Number.isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  const { name, email, password } = req.body;

  //repetition for security
  try {
    if (name && typeof name === "string") {
      await asyncMySQL(updateUser("name", name, userid));
    }

    if (email && typeof email === "string") {
      await asyncMySQL(updateUser("email", email, userid));
    }

    if (password) {
      await asyncMySQL(updateUser("password", password, userid));
    }
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }

  res.send({ status: 1 });
});

//return avgRating for a movie
router.get("/returnAvgRating/:movieid", async (req, res) => {
  console.log("account 6");
  const movieid = req.params.movieid;

  // ask sql for data

  const results = await asyncMySQL(returnAverageRating(movieid));

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "movieid not found" });
});

//return all avgRating for movies
router.get("/returnAllAvgRating", async (req, res) => {
  console.log("account 7");
  // ask sql for data

  const results = await asyncMySQL(returnAllAverageRating());

  if (results.length > 0) {
    res.send({ status: 1, results });
    return;
  }

  res.send({ status: 0, reason: "nothing found" });
});

module.exports = router;
