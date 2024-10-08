const express = require("express");

const app = express();

app.post(
  "/user",
  [
    (req, res, next) => {
      // Route Handler

      console.log("Handling router 1");

      //res.send("Response came in 1");
      next();
      // res.send("Route Handler 1");
    },
    (req, res, next) => {
      console.log("Handling router 2");
      // res.send("Response came in 2");
      next();
    },
  ],
  (req, res, next) => {
    console.log("Handling router 3");
    // res.send("Response came in 3");
    next();
  },
  (req, res, next) => {
    console.log("Handling router 4");
    // res.send("Response came in 4");
    next();
  },
  (req, res, next) => {
    console.log("Handling router 5");
    res.send("Response came in 5");
    // next();
  }
);

app.listen(7777, () => {
  console.log("Server is successfully listening on port:7777");
});
