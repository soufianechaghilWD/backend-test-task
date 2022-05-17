const mongoose = require("mongoose");

const schema = mongoose.Schema;

const catalogSchema = new schema({
  seller: { type: schema.Types.ObjectId, ref: "User" },
  products: [{ type: schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Catalog", catalogSchema);
