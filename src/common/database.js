const mongoose = require("mongoose");
const config = require("config");

const MONGODB_URI = config.get("db.mongodb_uri");

function connectMongoDB() {
  // Connect tới mongoDB server
  mongoose.connect(MONGODB_URI, {}, (err) => {
    if (err) {
      console.log(`Kết nối tới CSDL MongoDB thất bại`);
      console.error(err);
      return;
    }
    console.log(`Kết nối tới CSDL MongoDB thành công`);
  });
}

// Tiến hành connect
connectMongoDB();
