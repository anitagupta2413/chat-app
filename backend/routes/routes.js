const express = require("express");
const router = express.Router();

//importing controllers
const {registerUser} = require("../controller/authentication/register");
const {userLogIn} = require("../controller/authentication/login");
const deleteUser = require("../controller/authentication/deleteAccount");
const {fetchMessages} = require('../controller/messages/fetchingMessages');
const {updateRecipient , updateSender} = require('../controller/messages/storingMessages');
const {deleteChat} = require('../controller/messages/deleteMessages')
const {fetchUsers} = require('../controller/users/fetchAllUsers')


//authentication
router.post("/login", userLogIn);
router.post("/signup", registerUser);
router.delete("/deleteAccount", deleteUser);

//fetchingMessages
router.get("/fetchMessages" , fetchMessages);

//storing messages
router.patch("/store/receivedMessages" , updateRecipient);
router.patch("/store/sentMessages" , updateSender);

//deleting messages
router.patch("/deleteMessages", deleteChat);

//fetching users
router.get("/fetch/users" , fetchUsers);

module.exports = router;