const express = require("express");
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const authRouter = express.Router();

authRouter.post("/signUp", async (req, res) => {
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

authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ emailId: email });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (isPasswordValid) {
      // Add the token to the cookie and send the response back to the user
      const token = await user.getJWT();
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.status(200).send("Login Successful!!!");
    } else {
      res.status(400).send("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.status(200).send("Logged out successfully");
});

module.exports = authRouter;
