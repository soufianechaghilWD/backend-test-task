const getUser = require("../../models/user/getUser");
const retrieveSellers = require("../../models/user/retrieveSellers");

const getSellers = async (req, res) => {
  const { username } = req.user;

  try {
    // get the user
    const userResult = await getUser(username);
    if (!userResult.done) throw { message: userResult.message };
    // check if the user exist
    if (!userResult.user) throw { message: "User does not exist", status: 401 };

    const { userType} = userResult?.user;

    // check if the user is a buyer
    if(userType !== "buyer") throw({message: "Only buyers can get the list of sellers", status: 401})

    // get all the sellers
    const sellerResult = await retrieveSellers()
    if(!sellerResult.done) throw({message: sellerResult.message})

    res.status(200).json(sellerResult.sellers.map(seller => {
        return {
            id: seller?._id,
            username: seller?.username,
        }
    }))

  } catch (e) {
    res
      .status(e.status || 400)
      .json({ message: e.message || "Something went wrong" });
  }
};


module.exports = getSellers