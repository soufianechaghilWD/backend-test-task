const getUser = require("../../models/user/getUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const handlingError = require("../handlingError");

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // get the user
    const userResult = await getUser(username);

    if (!userResult.done) throw { message: userResult.message };

    // check if the user exist
    if (!userResult.user) throw { message: "User does not exist", status: 401 };

    // check the password
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userResult.user.password
    );

    if (!isPasswordCorrect)
      throw { message: "Password Incorrect", status: 403 };

    const token = jwt.sign({ username }, "JwtSecret", { expiresIn: "7d" });

    res.status(200).json({ token });
  } catch (e) {
    handlingError(res, e);
  }
};

module.exports = login;
