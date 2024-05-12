const user = require("../../model/user/user");
const { setJwtToken } = require("../../service/auth/token");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    //get all the data from the request body
    const { name, email, username, password } = req.body;

    //all the data should exist
    if (!(name && email && password && username)) {
      return res.status(400).json({ error: "fill all fields" });
    }

    //check if user already exist on particular email
    const exitingUser = await user.findOne({ email });
    if (exitingUser) {
      return res
        .status(401)
        .json({ error: "user already exist on this email" });
    }

    const duplicateUserName = await user.findOne({ username });
    if (duplicateUserName) {
      return res.status(401).json({ error: "this username is already taken" });
    }
    //encrypt the user
    const encryptedPassword = await bcrypt.hash(password, 10);

    //store the data in the database
    const newUser = await user.create({
      name: name,
      email: email,
      password: encryptedPassword,
      username: username,
    });

    //creating the jwt token
    const token = setJwtToken(newUser._id, email);

    //sending the response to the client
    newUser.password = undefined;
    return res.status(201).json({success: true, newUser: newUser, token: token });
  } catch (error) {
    return res.status(500).json({success: false, error: "Internal Server Error" });
  }
};

module.exports = {
  registerUser
};
