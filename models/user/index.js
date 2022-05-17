const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    userType: {type: String, enum: ["buyer", "seller"]}
})

module.exports = mongoose.model('User', userSchema)