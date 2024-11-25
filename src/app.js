const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.patch("/users", async (req, res) => {
  const userId = req.body.userId;
  const updatedFirstName = req.body.firstName;
  console.log("Updated firstName is", updatedFirstName);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        firstName: updatedFirstName,
        lastName: "Updated Last Name",
        gender: req.body.gender,
        skills: req.body.skills,
      },
      { returnDocument: "after", runValidators: true }
    );
    console.log("updatedUser is", updatedUser);

    if (updatedUser) {
      res.status(200).send("Successfully updated user");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

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
    res.status(500).send("Something went wrong");
  }
});

app.delete("/users", async (req, res) => {
  const userId = req.body.userId;
  try {
    const deletedUser = await User.findOneAndDelete({ _id: userId });
    console.log("Deleted user is", deletedUser);
    if (deletedUser) {
      res.status(200).send("User deleted successfully");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(500).send("Something went wrong while deleting");
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
    res.status(500).send(error);
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
