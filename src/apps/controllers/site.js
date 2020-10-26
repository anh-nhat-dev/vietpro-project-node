const ProductModel = require("../models/product");

module.exports.home = async (req, res) => {
  const products = await ProductModel.find({ is_stock: true }).limit(6);
  const productsFeatureds = await ProductModel.find({
    is_stock: true,
    featured: true,
  }).limit(6);
  res.render("site/index", { products, productsFeatureds });
};

module.exports.cart = (req, res) => {
  res.render("site/cart");
};

module.exports.category = (req, res) => {
  res.render("site/category");
};

module.exports.product = (req, res) => {
  res.render("site/product");
};

module.exports.search = (req, res) => {
  res.render("site/search");
};

module.exports.success = (req, res) => {
  res.render("site/success");
};
