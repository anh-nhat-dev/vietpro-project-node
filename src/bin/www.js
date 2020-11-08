#!/snap/bin/node

const app = require("../apps/app");
const config = require("config");
const socket = require("socket.io");
const { isValidObjectId } = require("mongoose");

// Lấy port từ trong config
const port = config.get("app.port");

// Lắng nghe các yêu cầu trên port

const server = app.listen(port, function () {
  console.info(`Server listening on port ${port}`);
});

const io = socket(server);

io.on("connection", function (socket) {
  console.log("Client connect");
});
