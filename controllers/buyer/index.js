const express = require("express");
const { Verify } = require("../verifyJwt");
const createOrder = require("./createOrder");
const getCatalog = require("./getCatalog");
const getSellers = require("./getSellers");

const buyerRouter = express.Router();

buyerRouter.get("/list-of-sellers", Verify, getSellers);
buyerRouter.get("/seller-catalog/:seller_id", Verify, getCatalog);
buyerRouter.post("/create-order/:seller_id", Verify, createOrder);

module.exports = buyerRouter;
