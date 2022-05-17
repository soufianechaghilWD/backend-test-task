const express = require('express')
const authRouter = require('./auth')
const buyerRouter = require('./buyer')
const sellerRouter = require('./seller')

const apiRouter = express.Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/seller', sellerRouter)
apiRouter.use('/buyer', buyerRouter)

module.exports = apiRouter