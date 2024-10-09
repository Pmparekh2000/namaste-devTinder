const express = require("express");
const { adminAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getUsers", (req, res, next) => {
  // Route Handler

  console.log("Handling router 1");

  res.send("Response came in 1");
  // next();
  // res.send("Route Handler 1");
});

app.get("/admin/deleteUser", (req, res, next) => {
  // Route Handler

  console.log("Handling router 2");

  res.send("Response came in 2");
  // next();
  // res.send("Route Handler 1");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port:7777");
});
