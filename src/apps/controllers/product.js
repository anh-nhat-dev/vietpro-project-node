const ProductModel = require("../models/product");
const Category = require("../models/category");
const slug = require("slug");
const paginate = require("../../common/paginate");
const fs = require("fs");
const path = require("path");
// module.exports.index = async (req, res) => {
//   const products = await ProductModel.find().populate("cat_id");

//   return res.render("admin/products/index", { products });
// };

module.exports.index = async (req, res) => {
  // Lấy ra trang hiện tại nếu không có đặt mặc định là 1
  const page = parseInt(req.query.page) || 1;
  // Số documents trên 1 trang
  const limit = 10;
  // Tính số documents sẽ bị bỏ qua
  const skip = limit * page - limit;

  // Lấy ra tổng số bản ghi
  const total = await ProductModel.find().countDocuments();
  // Tính tổng số trang
  const totalPage = Math.ceil(total / limit);

  // Lấy ra document
  const products = await ProductModel.find()
    .populate({
      path: "cat_id",
    })
    .skip(skip)
    .limit(limit);

  // Compile dữ liệu và trả về client
  res.render("admin/products/index", {
    products,
    totalPage,
    page,
    pages: paginate(page, totalPage),
  });
};

module.exports.add = async (req, res) => {
  const categories = await Category.find();
  res.render("admin/products/add-product", { categories });
};

module.exports.store = async (req, res) => {
  const body = req.body;
  const file = req.file;

  const product = {
    name: body.prd_name,
    slug: slug(body.prd_name, { lower: true }),
    description: body.prd_details,
    price: body.prd_price,
    cat_id: body.cat_id,
    status: body.prd_new,
    featured: body.prd_featured === "on",
    promotion: body.prd_promotion,
    warranty: body.prd_warranty,
    accessories: body.prd_accessories,
    is_stock: body.prd_status,
  };

  if (file) {
    const thumbnail = `products/${file.originalname}`;
    // Di chuyển file từ thư mục temp sang thư mục chứa ảnh sản phẩm
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
    product["thumbnail"] = thumbnail;
  }

  await new ProductModel(product).save();

  return res.redirect("/admin/products");
};

module.exports.edit = async (req, res) => {
  const id = req.params.id;

  const product = await ProductModel.findById(id);
  const categories = await Category.find();

  res.render("admin/products/edit-product", {
    product,
    categories,
  });
};

module.exports.update = async (req, res) => {
  const body = req.body;
  const file = req.file;
  const id = req.params.id;

  const product = {
    name: body.prd_name,
    slug: slug(body.prd_name, { lower: true }),
    description: body.prd_details,
    price: body.prd_price,
    cat_id: body.cat_id,
    status: body.prd_new,
    featured: body.prd_featured === "on",
    promotion: body.prd_promotion,
    warranty: body.prd_warranty,
    accessories: body.prd_accessories,
    is_stock: body.prd_status,
  };

  if (file) {
    const thumbnail = `products/${file.originalname}`;
    // Di chuyển file từ thư mục temp sang thư mục chứa ảnh sản phẩm
    fs.renameSync(file.path, path.resolve("src/public/images", thumbnail));
    product["thumbnail"] = thumbnail;
  }

  await ProductModel.updateOne({ _id: id }, { $set: product });

  return res.redirect("/admin/products");
};

module.exports.destroy = async (req, res) => {
  const id = req.params.id;

  await ProductModel.deleteOne({ _id: id });
  return res.redirect("/admin/products");
};
