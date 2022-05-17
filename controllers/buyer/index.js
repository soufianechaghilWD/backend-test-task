const express = require('express')
const { Verify } = require('../verifyJwt')
const getCatalog = require('./getCatalog')
const getSellers = require('./getSellers')

const buyerRouter = express.Router()

buyerRouter.get('/list-of-sellers', Verify, getSellers)
buyerRouter.get('/seller-catalog/:seller_id', Verify, getCatalog)

module.exports = buyerRouter