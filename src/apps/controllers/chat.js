const userModel = require("../models/user");
const roomModel = require("../models/room");

module.exports.chat = async function (req, res) {
  const userID = req.session.user._id;
  const users = await userModel.find({
    _id: { $nin: [userID] },
  });

  const rooms = await roomModel
    .find({
      users: { $all: [userID] },
    })
    .populate("users");

  res.render("chat", { users, rooms });
};
