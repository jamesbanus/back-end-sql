const express = require("express");
const router = express.Router();

//get all users
// router.get("/users", (req, res) => {
//   res.send({ status: 1, users: req.userData });
// });

//get user by id
router.get("/user/:id", (req, res) => {
  const userid = Number(req.params.id);
  //defensive checks
  //check userid is a number or not less than 1
  if (Number.isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }
  // ask sql for data
  const _userData = [...req.userData];
  const user = _userData.find((char) => {
    return char.userid === userid;
  });
  // check user exists
  if (!user) {
    res.send({ status: 0, reason: "userid not found" });
    return;
  }
  res.send({ status: 1, user });
});

//get all user actions
// router.get("/useractions", (req, res) => {
//   res.send({ status: 1, usersActions: req.userActions });
// });

//get user actions by userid
// router.get("/useractions/:id", (req, res) => {
//   const userid = Number(req.params.id);

//   //defensive checks
//   //check userid is a number or not less than 1
//   if (Number.isNaN(userid) || userid < 1) {
//     res.send({ status: 0, reason: "Invalid userid" });
//     return;
//   }

//   // copy and find specific useractions by userid
//   const _userActions = [...req.userActions];

//   const user = _userActions.filter((item) => item.userid === userid);

//   // check user exists
//   if (user.length === 0) {
//     res.send({ status: 0, reason: "userid not found" });
//     return;
//   }

//   res.send({ status: 1, user });
// });

//get all user actions by movieid
// router.get("/useractionsmovie/:movieid", (req, res) => {
//   const movieid = Number(req.params.movieid);

//   //defensive checks
//   //check userid is a number or not less than 1
//   if (Number.isNaN(movieid) || movieid < 1) {
//     res.send({ status: 0, reason: "Invalid movieid" });
//     return;
//   }

//   // copy and find specific useractions by movieid
//   const _userActions = [...req.userActions];

//   const movie = _userActions.filter((item) => item.movieid === movieid);

//   // check movieid exists
//   if (movie.length === 0) {
//     res.send({ status: 0, reason: "movieid not found" });
//     return;
//   }

//   res.send({ status: 1, movie });
// });

module.exports = router;
