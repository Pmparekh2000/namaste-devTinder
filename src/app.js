const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signUp", async (req, res) => {
  const dummyUser = {
    firstName: "Vanshika123",
    lastName: "Dhruv123",
    age: 20,
    gender: "F",
    password: "1597534682",
  };
  const user = new User(dummyUser);

  try {
    await user.save();
    res.status(200).send("User created successfully");
  } catch (error) {
    res.status(400).send("User creation failed");
  }
});

connectDB()
  .then(() => {
    console.log("Connected successfully to MongoDB Atlas");
    app.listen(7777, () => {
      console.log("Successfully listening on port", 7777);
    });
  })
  .catch((err) => {
    console.log("Error connecting to DB", err);
  });
