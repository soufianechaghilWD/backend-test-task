const handlingError = (res, e) => {
  res
    .status(e.status || 400)
    .json({ message: e.message || "Something went wrong" });
};

module.exports = handlingError;
