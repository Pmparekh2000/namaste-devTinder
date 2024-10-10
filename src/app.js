const express = require("express");
const { adminAuth } = require("./middlewares/auth");

const app = express();

app.get("/getUserData", (req, res, next) => {
  // Route Handler
  console.log("Handling router 2");
  // Fetch DB call
  throw new Error("Random Error");
  res.send("Response came in 2");
});

app.use("/", (err, req, res, next) => {
  if (err) {
    // Log your error
    res.status(500).send("Something went wrong");
  }
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port:7777");
});
