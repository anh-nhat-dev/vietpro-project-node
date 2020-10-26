const ProductModel = require("../models/product");
const CategoryModel = require("../models/category");
const CommentModel = require("../models/comment");
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

module.exports.product = async (req, res) => {
  const id = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const product = await ProductModel.findById(id);

  const filter = { prd_id: id };
  const limit = 12;
  const skip = limit * page - limit;
  const total = await ProductModel.find(filter).countDocuments();
  const totalPage = Math.ceil(total / limit);
  const comments = await CommentModel.find(filter).limit(limit).skip(skip);

  res.render("site/product", {
    product,
    comments,
    totalPage,
    page,
    pages: paginate(page, totalPage),
  });
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

module.exports.comment = async (req, res) => {
  const body = req.body;

  const comment = {
    email: body.email,
    full_name: body.full_name,
    content: body.content,
    prd_id: body.prd_id,
  };

  await new CommentModel(comment).save();

  return res.redirect(body.url);
};
