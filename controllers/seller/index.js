const express = require('express')
const { Verify } = require('../verifyJwt')
const createCatalog = require('./createCatalog')

const sellerRouter = express.Router()

sellerRouter.post('/create-catalog', Verify, createCatalog)

module.exports = sellerRouter