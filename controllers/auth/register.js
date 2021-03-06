const jwt = require("jsonwebtoken");
const createUser = require("../../models/user/createUser");
const handlingError = require("../handlingError");

const register = async (req, res) => {
  const { username, password, userType } = req.body;

  try {
    const userResult = await createUser(username, password, userType);

    if (!userResult.done) throw { status: 401, message: userResult.message };

    // creating a token
    const token = jwt.sign({ username }, "JwtSecret", { expiresIn: "7d" });

    res.status(200).json({ token });
  } catch (e) {
    handlingError(res, e);
  }
};

module.exports = register;
