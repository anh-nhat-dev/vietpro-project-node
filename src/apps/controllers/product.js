module.exports.index = (req, res) => {
  res.render("admin/products/index");
};

module.exports.add = (req, res) => {
  res.render("admin/products/add-product");
};

module.exports.edit = (req, res) => {
  res.render("admin/products/edit-product");
};
