const express = require("express");

const app = express();

app.use("/user", (req, res) => {
  res.send({ message: "Hahahahahahahah" });
});

// Will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send({ message: "Hello from the server" });
});

// This will only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({ firstName: "Prerak", lastName: "Parekh" });
});

app.post("/user", (req, res) => {
  console.log("Save data to the database");
  res.send("Data saved successfully to DB");
});

app.delete("/user", (req, res) => {
  console.log("Deleted data from the database");
  res.send("Data deleted successfully from DB");
});

app.listen(7777, () => {
  console.log("Server is successfully listening on port:7777");
});
