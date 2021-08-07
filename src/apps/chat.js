const socketIO = require("socket.io");
const userModel = require("./models/user");
const roomModel = require("./models/room");

const sharedsession = require("express-socket.io-session");
const app = require("./app");

module.exports = function (server) {
  const io = socketIO(server);

  io.use(sharedsession(app.session));

  io.on("connection", function (socket) {
    console.log("Client connect");

    socket.on("START_CONVERSATION", async function (data) {
      const currentUserId = socket.handshake.session.user._id;
      const { type, id } = data;

      // thông tin room
      let room;

      //Nếu type là user thì tìm room giữa 2 user
      if (type === "user") {
        room = await roomModel
          .findOne({
            users: { $all: [currentUserId, id] },
          })
          .populate("users");
      }

      // Nếu type là room  thì tìm room với id
      // kèm theo điều kiện phải có user hiện tại trong đó
      if (type === "room") {
        room = await roomModel
          .findOne({
            _id: id,
            users: { $all: [currentUserId] },
          })
          .populate("users");
      }

      // nếu như room kg tồn tại và type là user
      // thì sẽ tạo ra room mới
      if (!room && type === "user") {
        room = await new roomModel({
          users: [currentUserId, id],
        }).save();

        room = await roomModel.findById(room._id).populate("users");
      }

      // Nếu có room thì gửi thông tin về cho client
      if (room) {
        socket.emit("START_CONVERSATION_SUCCESS", { room });
      }
    });
  });
};
