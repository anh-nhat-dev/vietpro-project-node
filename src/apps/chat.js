const socketIO = require("socket.io");
const app = require("./app");
const shareSession = require("express-socket.io-session");
const messageModel = require("./models/message");
const roomModel = require("./models/room");

module.exports.openServer = (server) => {
  const io = socketIO(server);

  io.use(shareSession(app.session));
  io.on("connection", (socket) => {
    if (
      socket.handshake.session &&
      socket.handshake.session.user &&
      socket.handshake.session.user._id
    ) {
      socket.join(socket.handshake.session.user._id);
    }

    socket.on("START_CONVERSATION", async ({ type, id }) => {
      const currentUserId = socket.handshake.session.user._id;

      const users = [currentUserId];
      let room;

      if (type === "user") {
        users.push(id);
        room = await roomModel
          .findOne({
            users: { $all: users },
            type: "private",
          })
          .populate("users");
      }

      if (type === "room") {
        room = await roomModel
          .findOne({
            users: { $all: users },
            _id: id,
          })
          .populate("users");
      }

      if (!room && type === "user") {
        room = await new roomModel({
          users: users,
        }).save();

        room = await roomModel.findById(room._id).populate("users");
      }

      if (room) {
        socket.emit("START_CONVERSATION_SUCCESS", { room });
      }
    });

    socket.on("GET_MESSAGE", async ({ page, roomID }) => {
      const messages = await messageModel
        .find({ room_id: roomID })
        .limit(20)
        .sort("-_id");

      socket.emit("RECEIVER_MESSAGE", { messages });
    });

    socket.on("NEW_MESSAGE", async ({ roomID, authorID, body }) => {
      const room = await roomModel.findById(roomID);
      if (!room) return;
      const mess = await new messageModel({
        body,
        author_id: authorID,
        room_id: roomID,
      }).save();

      socket.emit("RECIEVER_NEW_MESSAGE", { mess });
      room.users.forEach((u) => socket.to(u));
      socket.emit("RECIEVER_NEW_MESSAGE", { mess });
    });
  });
};
