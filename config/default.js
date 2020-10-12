module.exports = {
  app: {
    port: 3000,
    static_folder: __dirname + "/../src/public",
    view_folder: __dirname + "/../src/apps/views",
    template_engine: "ejs",
  },
};
