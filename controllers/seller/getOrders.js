const getUser = require("../../models/user/getUser");
const orderSchema = require("../../models/order");
const handlingError = require("../handlingError");

const getOrders = async (req, res) => {
  const { username } = req.user;

  try {
    // get the user
    const userResult = await getUser(username);
    if (!userResult.done) throw { message: userResult.message };

    // check if the user exist
    if (!userResult.user) throw { message: "User does not exist", status: 401 };

    const { userType, _id } = userResult?.user;
    // check if the user is a seller
    if (userType !== "seller")
      throw { message: "A buyer can not get the orders", status: 401 };

    // get the orders
    const orders = await orderSchema
      .find({ seller: _id })
      .populate({ path: "products" })
      .populate({ path: "buyer" });
    if (orders.length === 0)
      res.status(200).json({ message: "You have no orders" });

    res.status(200).json({ orders });
  } catch (e) {
    handlingError(res, e);
  }
};

module.exports = getOrders;
