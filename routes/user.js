const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");
const {
  addUser,
  deleteUser,
  deleteUserActions,
  getUser,
  updateName,
  updateEmail,
  updatePassword,
} = require("../mysql/queries");

//add a user
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;

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

  // store user in database
  try {
    const result = await asyncMySQL(addUser(name, email, password));
    res.send({ status: 1, userID: result.insertId });
  } catch (e) {
    res.send({ status: 0 });
  }
});

// delete a user and their actions
router.delete("/:id", async (req, res) => {
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

  res.send({ status: 1 });
});

//get user by id
router.get("/:id", async (req, res) => {
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
router.patch("/:id", async (req, res) => {
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
      await asyncMySQL(updateName(name, userid));
    }

    if (email && typeof email === "string") {
      await asyncMySQL(updateEmail(email, userid));
    }

    if (password) {
      await asyncMySQL(updatePassword(password, userid));
    }
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }

  res.send({ status: 1 });
});

module.exports = router;
