const user = require("../../model/user/user");
const { setJwtToken } = require("../../service/auth/token");
const bcrypt = require("bcryptjs");

const userLogIn = async (req, res) => {
  try {
    //getting the data from the request body
    const { email, password } = req.body;

    //all the data should exist
    if (!(email && password)) {
      return res.status(400).json({ error: "fill all fields" });
    }

    //find the user
    const existedUser = await user.findOne({ email });
    if (!existedUser) {
      return res
        .status(401)
        .json({ error: "no user exist with this email id" });
    }

    //validation to check the password and user existence
    if (!(await bcrypt.compare(password, existedUser.password))) {
      return res.status(401).json({ error: "wrong password" });
    } else {
      const token = setJwtToken(existedUser._id, email);
      user.password = undefined;
      return res.json({ success: true, user: existedUser, token: token });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  userLogIn
};
