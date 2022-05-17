const orderSchema = require('../../models/order');
const getUser = require('../../models/user/getUser');

const createOrder = async (req, res) => {
  const { username } = req.user;
  const { products } = req.body
  const seller_id = req.params.seller_id


  try {

    // check if there is no items 
    if(products.length === 0) throw({message: "Can not make an order with no items"})

    // get the user
    const userResult = await getUser(username);
    if (!userResult.done) throw { message: userResult.message };

    // check if the user exist
    if (!userResult.user) throw { message: "User does not exist", status: 401 };

    const { userType, _id } = userResult?.user;

    // check if the user is a buyer
    if (userType !== "buyer")
      throw { message: "Only buyers can make an order", status: 401 };

    // make the order
    const Resultorder = new orderSchema({
        buyer: _id,
        seller: seller_id,
        products: products
    })
    await Resultorder.save()

    const order = await orderSchema.findOne({_id: Resultorder._id}).populate({path: "products"})

    res.status(200).json(order)

  } catch (e) {
    res
      .status(e.status || 400)
      .json({ message: e.message || "Something went wrong" });
  }
};

module.exports = createOrder;
