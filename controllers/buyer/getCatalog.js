const getUser = require("../../models/user/getUser");
const catalogSchema = require("../../models/catalog");
const handlingError = require("../handlingError");

const getCatalog = async (req, res) => {
  const { username } = req.user;
  const seller_id = req.params.seller_id;
  try {
    // get the user
    const userResult = await getUser(username);
    if (!userResult.done) throw { message: userResult.message };

    // check if the user exist
    if (!userResult.user) throw { message: "User does not exist", status: 401 };

    const { userType } = userResult?.user;

    // check if the user is a buyer
    if (userType !== "buyer")
      throw {
        message: "Only buyers can get the catalog of a seller",
        status: 401,
      };

    // get the catalog
    const catalog = await catalogSchema
      .findOne({ seller: seller_id })
      .populate({
        path: "products",
      });

    if (!catalog) res.status(200).json({ message: "Seller has no catalogs" });

    res.status(200).json({ catalog });
  } catch (e) {
    handlingError(res, e);
  }
};

module.exports = getCatalog;
