const express = require("express");
const app = express();

//convert the body to json
app.use(express.json());

app.use("/useractions", require("./routes/useractions"));
app.use("/user", require("./routes/user"));

const port = process.env.Port || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
