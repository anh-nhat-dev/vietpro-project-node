const ProductModel = require("../models/product");
const Category = require("../models/category");

const paginate = require("../../common/paginate");

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

module.exports.add = (req, res) => {
  res.render("admin/products/add-product");
};

module.exports.edit = (req, res) => {
  res.render("admin/products/edit-product");
};
