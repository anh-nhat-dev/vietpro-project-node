const users = [
  {
    id: 1,
    email: "admin@gmail.com",
    password: "123456",
  },
];

module.exports.login = (req, res) => {
  res.render("admin/login", { error: null });
};

module.exports.postLogin = (req, res) => {
  const { email, password } = req.body;

  let error;
  const user = users.find((u) => u.email === email);

  if (!user) {
    error = `Không tìm thấy tài khoản`;
  }

  if (user && user.password !== password) {
    error = "Mật khẩu không chính xác";
  }

  return error
    ? res.render("admin/login", { error })
    : res.redirect("/admin/dashboard");
};
