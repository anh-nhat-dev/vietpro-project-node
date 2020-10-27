module.exports = {
  app: {
    port: 3000,
    static_folder: __dirname + "/../src/public",
    view_folder: __dirname + "/../src/apps/views",
    template_engine: "ejs",
    cookie_secret: "Vietpro",
    dir_upload_temp: __dirname + "/../temp",
    url: "http://localhost:3000",
  },
  db: {
    mongodb_uri: "mongodb://127.0.0.1:27017/vp_shop_project",
  },
  mail: {
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465
    auth: {
      user: "vietpro.shop28@gmail.com",
      pass: "rnqqtpbwsivtqopl",
    },
  },
};
