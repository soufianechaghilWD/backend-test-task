const userSchema = require("./index");

const getUser = async (username) => {
  try {
    const user = await userSchema.findOne({ username });
    return { done: true, user: user };
  } catch (e) {
    return { done: false, message: e.message };
  }
};

module.exports = getUser;
