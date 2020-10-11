const express = require("express");

const router = express.Router();

router.get("/admin/dashboard", function (req, res) {
  res.send("DASHBOARD PAGE");
});

router.get("/admin/products", function (req, res) {
  res.send("PRODUCTS PAGE");
});

module.exports = router;
