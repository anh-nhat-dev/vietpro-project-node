// Load module express
const express = require("express");

// Khởi tạo ứng dụng từ express
const app = express();

const config = require("config");

// Lấy ra config của ứng dụng
const appConfig = config.get("app");

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
