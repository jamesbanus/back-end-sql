const { getIDbyToken } = require("../mysql/queries");
const asyncMySQL = require("../mysql/connection");

const checkToken = async (req, res, next) => {
  const results = await asyncMySQL(getIDbyToken(req.headers.token));

  if (results.length > 0) {
    //attach token id to request
    req.validatedUserId = results[0].user_id;

    next();
    return;
  }

  res.send({ status: 0, reason: "Bad Token" });
};

module.exports = checkToken;
