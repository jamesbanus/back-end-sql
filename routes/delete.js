const express = require("express");
const router = express.Router();

router.delete("/user/:id", (req, res) => {
  const userid = Number(req.params.id);

  //defensive checks
  //check userid is a number or not less than 1
  if (isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  // copy and find specific user
  const indexOf = req.userData.findIndex((item) => {
    return item.userid === userid;
  });

  if (indexOf < 0) {
    res.send({ status: 0, reason: "userid not found, potentially deleted" });
    return;
  }

  req.userData.splice(indexOf, 1);

  for (let i = req.userActions.length - 1; i >= 0; i--) {
    if (userid === req.userActions[i].userid) {
      req.userActions.splice(i, 1);
    }
  }
  res.send({ status: 1 });
});

module.exports = router;
