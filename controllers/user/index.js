const express = require("express");
const createUser = require("../../models/user/createUser");
const jwt = require("jsonwebtoken");
const getUser = require("../../models/user/getUser");
const bcrypt = require("bcrypt");

const userController = express.Router();

userController.post("/api/auth/register", async (req, res) => {
  const { username, password, userType } = req.body;

  try {
    const result = await createUser(username, password, userType);

    if (!result.done) throw { status: 401, message: result.message };

    // creating a token
    const token = jwt.sign({ username }, "JwtSecret", { expiresIn: "7d" });

    res.status(200).json({ token });
  } catch (e) {
    res
      .status(e.status || 400)
      .json({ message: e.message || "Something went wrong" });
  }
});

userController.post("/api/auth/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // get the user
    const result = await getUser(username);
    console.log(result);

    if (!result.done) throw { message: result.message };

    // check if the user exist
    if (!result.user) throw { message: "User does not exist", status: 401 };

    // check the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      result.user.password
    );

    if (!isPasswordCorrect)
      throw { message: "Password Incorrect", status: 403 };

    const token = jwt.sign({ username }, "JwtSecret", { expiresIn: "7d" });

    res.status(200).json({ token });
  } catch (e) {
    res
      .status(e.status || 400)
      .json({ message: e.message || "Something went wrong" });
  }
});

module.exports = userController;
