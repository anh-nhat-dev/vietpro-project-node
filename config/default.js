module.exports = {
  app: {
    port: 3000,
    static_folder: __dirname + "/../src/public",
    view_folder: __dirname + "/../src/apps/views",
    template_engine: "ejs",
  },
  db: {
    mongodb_uri: "mongodb://127.0.0.1:27017/vp_shop_k24",
  },
};
