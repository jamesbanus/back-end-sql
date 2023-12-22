const { getIDbyToken } = require("../mysql/queries");
const asyncMySQL = require("../mysql/connection");
const sha256 = require("sha256");

const checkToken = async (req, res, next) => {
  const results = await asyncMySQL(getIDbyToken(req.headers.token));

  if (results.length > 0) {
    //attach token id to request
    req.validatedUserId = results[0].user_id;

    if (req.headers.password) {
      //hash the password
      req.hashPassword = sha256(req.headers.password + "secret_Key");
    }
    if (req.headers.password2) {
      //hash the password
      req.hashNewPassword = sha256(req.headers.password2 + "secret_Key");
    }

    next();
    return;
  }

  res.send({ status: 0, reason: "Bad Token" });
};

module.exports = checkToken;
