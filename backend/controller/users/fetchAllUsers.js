const user = require("../../model/user/user");

const fetchUsers = async (req, res) => {
  try {
    const allUsers = await user.find();
    res.json({ success: true, users: allUsers });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  fetchUsers,
};
