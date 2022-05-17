const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  userType: { type: String, enum: ["buyer", "seller"], required: true },
});

module.exports = mongoose.model("User", userSchema);
