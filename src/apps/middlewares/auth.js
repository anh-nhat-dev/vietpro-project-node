module.exports.checkUser = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect("/admin/login");
  }
  next();
};

module.exports.checkGuest = (req, res, next) => {
  if (req.session.user) {
    return res.redirect("/admin");
  }
  next();
};

module.exports.checkRole = (req, res, next) => {
  const user = req.session.user;
  if (user.role === "admin") {
    return next();
  }

  res.redirect("/");
};
