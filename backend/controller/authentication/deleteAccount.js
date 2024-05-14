const user = require("../../model/user/user");

const deleteUser = async (req, res) => {
  const { userId } = req.body;
  try {
    const result = await user.deleteOne({ _id: userId });
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = {deleteUser};
