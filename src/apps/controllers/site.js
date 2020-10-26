const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const paginate = require("../../common/paginate");
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

module.exports.category = async (req, res) => {
  const id = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const cate = await CategoryModel.findById(id);

  const filter = { cat_id: id };
  const limit = 12;
  const skip = limit * page - limit;
  const total = await ProductModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total / limit);

  const products = await ProductModel.find(filter).limit(limit).skip(skip);
  res.render("site/category", {
    cate,
    totalPage,
    products,
    page,
    total,
    pages: paginate(page, totalPage),
  });
};

module.exports.product = (req, res) => {
  res.render("site/product");
};

module.exports.search = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const q = req.query.q || "";

  const filter = {};

  if (q.length) {
    filter.$text = { $search: q };
  }

  const limit = 12;
  const skip = limit * page - limit;
  const total = await ProductModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total / limit);

  const products = await ProductModel.find(filter).limit(limit).skip(skip);
  res.render("site/search", {
    products,
    page,
    totalPage,
    q,
    pages: paginate(page, totalPage),
  });
};

module.exports.success = (req, res) => {
  res.render("site/success");
};
