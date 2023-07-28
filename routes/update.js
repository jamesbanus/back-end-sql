const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");

//update user
router.patch("/user/:id", async (req, res) => {
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
      await asyncMySQL(
        `UPDATE users SET name = "${name}" WHERE id LIKE "${userid}";`
      );
    }

    if (email && typeof email === "string") {
      await asyncMySQL(
        `UPDATE users SET email = "${email}" WHERE id LIKE "${userid}";`
      );
    }

    if (password) {
      await asyncMySQL(
        `UPDATE users SET password = "${password}" WHERE id LIKE "${userid}";`
      );
    }
  } catch (error) {
    res.send({ status: 0, reason: error.sqlMessage });
    return;
  }

  res.send({ status: 1 });
});

//update favourite & rating
router.patch("/useraction/:id/:movieid", (req, res) => {
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

  const indexOf = req.userActions.findIndex((item) => {
    return item.userid === userid && item.movieid === movieid;
  });

  // check user or movie exists
  if (indexOf === -1) {
    res.send({ status: 0, reason: "userid or movieid not found" });
    return;
  }

  //repitition for security
  if (rating && typeof rating === "number") {
    req.userActions[indexOf].rating = rating;
  }

  if (typeof favourite === "boolean") {
    req.userActions[indexOf].favourite = favourite;
  }

  res.send({ status: 1 });
});

module.exports = router;
