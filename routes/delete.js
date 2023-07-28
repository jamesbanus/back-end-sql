const express = require("express");
const router = express.Router();
const asyncMySQL = require("../mysql/connection");

router.delete("/user/:id", async (req, res) => {
  const userid = Number(req.params.id);

  //defensive checks
  //check userid is a number or not less than 1
  if (isNaN(userid) || userid < 1) {
    res.send({ status: 0, reason: "Invalid userid" });
    return;
  }

  // delete user
  await asyncMySQL(
    `DELETE
      FROM users 
        WHERE id LIKE ${userid};`
  );

  //delete associated actions
  await asyncMySQL(
    `DELETE
      FROM user_actions 
        WHERE user_id LIKE ${userid};`
  );

  res.send({ status: 1 });
});

module.exports = router;
