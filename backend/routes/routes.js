const express = require('express');
const {userSignUp , userLogIn , fetchUsers  } = require('../controller/user/authentication')
const {fetchReceivedMessage , fetchSentMessages} = require('../controller/user/fetchingMessages');

const router = express.Router();

router.post('/signup' , userSignUp);

router.post('/login' , userLogIn);

router.get('/fetch' , fetchUsers);

router.post('/sentMessages' , fetchSentMessages);

router.post('/receivedMessages' , fetchReceivedMessage);

module.exports = router;