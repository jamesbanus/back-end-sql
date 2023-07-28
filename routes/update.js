const express = require("express");
const router = express.Router();

//update user
router.patch("/user/:id", (req, res) => {
  const userid = Number(req.params.id);

  //check userid is a number
  if (Number.isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  const { name, email, password } = req.body;

  const indexOf = req.userData.findIndex((item) => {
    return item.userid === userid;
  });

  // check user exists
  if (indexOf === -1) {
    res.send({ status: 0, reason: "userid not found" });
    return;
  }

  //repitition for security
  if (name && typeof name === "string") {
    req.userData[indexOf].name = name;
  }

  if (email && typeof email === "string") {
    req.userData[indexOf].email = email;
  }

  if (password) {
    req.userData[indexOf].password = password;
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
