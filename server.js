const express = require("express");
const app = express();
// const userData = require("./users.json");
// const userActions = require("./userActions.json");

// app.use((req, res, next) => {
//   req.userData = userData;
//   next();
// });

// app.use((req, res, next) => {
//   req.userActions = userActions;
//   next();
// });

//convert the body to json
app.use(express.json());

app.use("/get", require("./routes/get"));
// app.use("/delete", require("./routes/delete"));
// app.use("/add", require("./routes/add"));
// app.use("/update", require("./routes/update"));

const port = process.env.Port || 6001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
