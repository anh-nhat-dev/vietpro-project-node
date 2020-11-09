const CategoryModel = require("../models/category");

module.exports = async function (req, res, next) {
  res.locals.cates = await CategoryModel.find();
  res.locals.totalCartItems = req.session.cart.reduce((a, c) => a + c.qty, 0);
  res.locals.user = req.session.user;
  next();
};
