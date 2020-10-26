const CategoryModel = require("../models/category");

module.exports = async function (req, res, next) {
  res.locals.cates = await CategoryModel.find();
  next();
};
