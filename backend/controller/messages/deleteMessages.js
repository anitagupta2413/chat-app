const user = require("../../model/user/user");

const deleteChat = async (req, res) => {
  const { userId, pairId } = req.body;
  try {
    const foundUser = await user.findById(userId);
    foundUser.messages.pull({ pairId: pairId });
    await foundUser.save();

    res
      .status(201)
      .json({ success: true, message: "Chat deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "error deleting messages" });
  }
};

module.exports = {
  deleteChat,
};
