// Load module express
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");

// Khởi tạo ứng dụng từ express
const app = express();

const config = require("config");
// Lấy ra config của ứng dụng
const appConfig = config.get("app");

// set cookie & session
app.use(cookieParser());
app.use(
  session({
    secret: appConfig.cookie_secret,
    resave: true,
    saveUninitialized: true,
  })
);

// Kết nối tới database
require("../common/database");
app.use(require("../apps/middlewares/cart"));
app.use(require("../apps/middlewares/share"));

// Static file
app.use("/static", express.static(appConfig.static_folder));
app.set("views", appConfig.view_folder);
app.set("view engine", appConfig.template_engine);

// Parse dữ liệu từ form
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Load router

app.use(require("../routers/web"));

// Export cho module khác sử dụng
module.exports = app;
