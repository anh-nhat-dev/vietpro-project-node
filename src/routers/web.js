const express = require("express");
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const Productcontroller = require("../apps/controllers/product");
const SiteController = require("../apps/controllers/site");
const ChatController = require("../apps/controllers/chat");
// Middleware
const UploadMiddleware = require("../apps/middlewares/upload");

const AuthMiddleware = require("../apps/middlewares/auth");

// Khởi tạo router
const router = express.Router();

// router.get("/admin/dashboard", function (req, res) {
//   res.send("DASHBOARD PAGE");
// });

// router.get("/admin/products", function (req, res) {
//   res.send("PRODUCTS PAGE");
// });

// Site
router.get("/", SiteController.home);
router.get("/cart", SiteController.cart);
router.get("/cart/:id/delete", SiteController.deleteCart);
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.get("/search", SiteController.search);
router.post("/success", SiteController.success);
router.post("/comments", SiteController.comment);
router.post("/add-to-cart", SiteController.addToCart);
router.post("/cart", SiteController.updateCart);
router.post("/order", SiteController.order);

// Chat

router.get("/chat", AuthMiddleware.checkUser, ChatController.chat);

// Admin
router
  .route("/admin/login")
  .all(AuthMiddleware.checkGuest)
  .get(AuthController.login)
  .post(AuthController.postLogin);

// Check Level + Guest cho router admin

router.use("/admin", AuthMiddleware.checkUser, AuthMiddleware.checkRole);

router.get("/admin/logout", AuthController.logout);
router.get("/admin/dashboard", AdminController.dashboard);
router.get("/admin/products", Productcontroller.index);

router
  .route("/admin/products/create")
  .get(Productcontroller.add)
  .post(UploadMiddleware.single("prd_image"), Productcontroller.store);

router
  .route("/admin/products/edit/:id")
  .get(Productcontroller.edit)
  .post(UploadMiddleware.single("prd_image"), Productcontroller.update);

router.get("/admin/products/delete/:id", Productcontroller.destroy);

module.exports = router;
