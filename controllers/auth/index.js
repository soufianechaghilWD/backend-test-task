const express = require('express')
const login = require('./login')
const register = require('./register')

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)

module.exports = authRouter