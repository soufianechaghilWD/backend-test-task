const userSchema = require("./index");

const checkUserByUsername = async (username) => {
  try {
    const user = await userSchema.find({ username });

    if (user.length > 0) return { done: true, exist: true };

    return { done: true, exist: false };
  } catch (e) {
    return { done: false, message: e.message };
  }
};

module.exports = checkUserByUsername;
