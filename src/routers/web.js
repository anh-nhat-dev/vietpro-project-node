const express = require("express");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const Productcontroller = require("../apps/controllers/product");

const router = express.Router();

// router.get("/admin/dashboard", function (req, res) {
//   res.send("DASHBOARD PAGE");
// });

// router.get("/admin/products", function (req, res) {
//   res.send("PRODUCTS PAGE");
// });

router
  .route("/admin/login")
  .get(AuthController.login)
  .post(AuthController.postLogin);

router.get("/admin/dashboard", AdminController.dashboard);
router.get("/admin/products", Productcontroller.index);
router.get("/admin/products/create", Productcontroller.add);
router.get("/admin/products/edit", Productcontroller.edit);

module.exports = router;
