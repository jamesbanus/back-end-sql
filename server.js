const express = require("express");
const app = express();
const cors = require("cors");
const asyncMySQL = require("./mysql/connection");
const checkToken = require("./middleware/auth");

app.use(cors());

//convert the body to json
app.use(express.json());

app.use("/useractions", checkToken, require("./routes/useractions"));
app.use("/account", require("./routes/account"));

const port = process.env.Port || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
