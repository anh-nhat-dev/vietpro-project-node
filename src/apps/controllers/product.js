const ProductModel = require("../models/product");
const Category = require("../models/category");
const paginate = require("../../common/paginate");

module.exports.index = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const skip = limit * page - limit;
  const total = await ProductModel.find().countDocuments();
  const totalPage = Math.ceil(total / limit);
  const products = await ProductModel.find()
    .populate({
      path: "cat_id",
    })
    .skip(skip)
    .limit(limit);
  res.render("admin/products/index", {
    products,
    totalPage,
    page,
    pages: paginate(page, totalPage),
  });
};

module.exports.add = (req, res) => {
  res.render("admin/products/add-product");
};

module.exports.edit = (req, res) => {
  res.render("admin/products/edit-product");
};
