const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileDate } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("User does not exist");
    }

    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileDate(req)) {
      throw new Error("Invalid edit request");
    }

    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    console.log("Logged In user", loggedInUser);
    await loggedInUser.save();
    res.status(200).json({
      message: `${loggedInUser.firstName}, your profile was updated successfully`,
      user: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await User.findOne({ emailId: email });

    if (!user) {
      throw new Error("Invalid user credentials");
    }

    const isOldPasswordValid = await user.verifyPassword(oldPassword);
    if (isOldPasswordValid) {
      user["password"] = await bcrypt.hash(newPassword, 10);
      await user.save();
      res
        .status(200)
        .send(`Password changed successfully for ${user.firstName}`);
    } else {
      res.status(400).send("ERROR: Invalid user credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

module.exports = profileRouter;
