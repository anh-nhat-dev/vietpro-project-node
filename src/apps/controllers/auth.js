const UserModel = require("../models/user");

module.exports.login = (req, res) => {
  res.render("admin/login", { error: null });
};

module.exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  let error;

  UserModel.findOne({ email: email }).then((user) => {
    if (!user) {
      error = `Không tìm thấy tài khoản`;
    }
    if (user && user.password !== password) {
      error = "Mật khẩu không chính xác";
    }

    if (error) {
      return res.render("admin/login", { error });
    }
    req.session.user = user;
    res.redirect("/admin/dashboard");
  });
};

module.exports.logout = (req, res) => {
  delete req.session.user;
  res.redirect("/admin/login");
};
