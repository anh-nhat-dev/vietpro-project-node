const multer = require("multer");
const config = require("config");

const upload = multer({
  dest: config.get("app.dir_upload_temp"),
});

module.exports = upload;
