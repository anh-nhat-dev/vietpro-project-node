const roomModel = require("../models/room");
const userModel = require("../models/user");
module.exports.chat = async (req, res) => {
  const userId = req.session.user._id;

  const users = await userModel.find({
    _id: { $nin: [userId] },
  });

  const rooms = await roomModel
    .find({
      users: { $all: [userId] },
    })
    .populate("users");
  res.render("chat", { rooms, users });
};
