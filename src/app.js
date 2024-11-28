const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");

app.use(express.json());

app.patch("/users/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const updatedFirstName = req.body.firstName;

  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(req.body).every((key) =>
      ALLOWED_UPDATES.includes(key)
    );

    if (!isUpdateAllowed) {
      res.status(400).send("Update not allowed");
    }

    if (req.body.skills.length > 5) {
      res.status(400).send("Skills cannot be more then 5");
    }
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
  // const dummyUser = {
  //   firstName: "Vanshika123",
  //   lastName: "Dhruv123",
  //   age: 20,
  //   gender: "F",
  //   password: "1597534682",
  // };
  try {
    // Step - 1 Validation of data

    validateSignUpData(req);

    // Step - 2 Encrypt the password

    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Step - 3 Store the user into the database
    console.log("Request body obtained is", req.body);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.status(200).send("User created successfully");
  } catch (error) {
    res.status(400).send("ERROR: " + error.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ emailId: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.status(200).send("Login Successful!!!");
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
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
