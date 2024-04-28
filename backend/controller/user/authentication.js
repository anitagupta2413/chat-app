const user = require("../../model/user/user");
const { setJwtToken } = require("../../service/auth/token");
const bcrypt = require("bcryptjs");

const userSignUp = async (req, res) => {
  try {
    //get all the data from the request body
    const { name, email, password } = req.body;

    //all the data should exist
    if (!(name && email && password)) {
      return res.status(400).json({ error: "fill all fields" });
    }

    //check if user already exist on particular email
    const exitingUser = await user.findOne({ email });
    if (exitingUser) {
      return res.status(401).json({ error: "user already exist on this email" });
    }

    //encrypt the user
    const encryptedPassword = await bcrypt.hash(password, 10);

    //store the data in the database
    const newUser = await user.create({
      name: name,
      email: email,
      password: encryptedPassword,
    });

    //creating the jwt token
    const token = setJwtToken(newUser._id, email);

    //sending the response to the client
    user.password = undefined;
   return  res.status(201).json({ newUser: newUser, token: token });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

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
    if(!(existedUser)){
      return res.status(401).json({ error: "no user exist with this email id" });
    }

    //validation to check the password and user existence
    if (!(await bcrypt.compare(password, existedUser.password))) {
      return res.status(401).json({ error: "wrong password" });
    }
    else {
      const token = setJwtToken(existedUser._id, email);
      user.password = undefined;
       return res.json({ user: existedUser, token: token });
    }
  } catch (error) {
   return res.status(500).json({ error: "Internal Server Error" });
  }
};

// fetching users
const fetchUsers = async (req, res) => {
  try {
    const allUsers = await user.find();
    res.json(allUsers);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// deleting a user

const deleteUser = async (req , res) => {
  const {userId} = req.body
  try{
    const user = await user.deleteOne({userId})
  }
  catch(error){
    console.log(error);
  }
}

module.exports = {
  userSignUp,
  userLogIn,
  fetchUsers,
};
