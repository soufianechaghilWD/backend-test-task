const SellerHasCatalogs = require("../../models/catalog/sellerHasCatalog");
const getUser = require("../../models/user/getUser");
const productSchema = require('../../models/product')
const catalogSchema = require('../../models/catalog')

const createCatalog = async (req, res) => {
  const { username } = req.user;
  const { products } = req.body;

  try {
    // get the user
    const userResult = await getUser(username);
    if (!userResult.done) throw { message: userResult.message };

    // check if the user exist
    if (!userResult.user) throw { message: "User does not exist", status: 401 };

    const { userType, _id } = userResult?.user;
    // check if the user is a seller
    if (userType !== "seller")
      throw { message: "A buyer can not create a catalog", status: 401 };

    // check if the seller has any previous calatogs (seller can have one catalog)
    const DoesSellerHasCatalogs = await SellerHasCatalogs(_id);
    if (!DoesSellerHasCatalogs?.done)
      throw { message: DoesSellerHasCatalogs.message };

    if (DoesSellerHasCatalogs?.has)
      throw { message: "Seller can only have one catalog", status: 401 };

    // create products
    const savedProducts = await productSchema.insertMany(products);

    // create a catalog
    const catalog = new catalogSchema({
      seller: _id,
      products: savedProducts.map((prod) => prod._id),
    });
    await catalog.save();

    // return the catalog
    res.status(200).json({ catalog });
  } catch (e) {
    res
      .status(e.status || 400)
      .json({ message: e.message || "Something went wrong" });
  }
};


module.exports = createCatalog