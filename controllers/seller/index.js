const express = require("express");
const { Verify } = require("../verifyJwt");
const createCatalog = require("./createCatalog");
const getOrders = require("./getOrders");

const sellerRouter = express.Router();

sellerRouter.post("/create-catalog", Verify, createCatalog);
sellerRouter.get("/orders", Verify, getOrders);

module.exports = sellerRouter;
