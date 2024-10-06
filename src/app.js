const express = require("express");

const app = express();

// This will only handle GET call to /user
app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);

  res.send({ firstName: "Prerak", lastName: "Parekh" });
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port:7777");
});
