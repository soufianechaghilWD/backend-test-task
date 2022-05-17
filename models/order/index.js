const mongoose = require('mongoose')

const schema = mongoose.Schema

const orderSchema = new schema({
    buyer: {type: schema.Types.ObjectId, ref: "User"},
    seller: {type: schema.Types.ObjectId, ref: "User"},
    products: [{type: schema.Types.ObjectId, ref: "Product"}]
})

module.exports = mongoose.model('Order', orderSchema)