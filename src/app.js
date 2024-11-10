const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

// Get user(s) based on first name
app.get("/users", async (req, res) => {
  try {
    const users = await User.findOne({});
    console.log("Users obtained are", users);

    if (users === null) {
      res.status(404).send("User not found");
    } else {
      res.status(200).send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.post("/signUp", async (req, res) => {
  const dummyUser = {
    firstName: "Vanshika123",
    lastName: "Dhruv123",
    age: 20,
    gender: "F",
    password: "1597534682",
  };
  console.log("Request body obtained is", req.body);

  const user = new User(req.body);

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
