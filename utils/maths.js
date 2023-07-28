const genRandomString = (len) => {
  return Math.round(Math.random() * 10000000);
};

module.exports = { genRandomString };
