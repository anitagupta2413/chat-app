const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sent : [
    {
      sendTo : {
        type : String
      },
      messages : [
        {
          timeStamp : {
            type: Date,
            default: Date.now,
          },
          message : {
            type : String
          }
        }
      ]
    }
  ],
  received : [
    {
      receivedFrom : {
        type : String
      },
      messages : [
        {
          timeStamp : {
            type: Date,
            default: Date.now,
          },
          message : {
            type : String
          }
        }
      ]
    }
  ]
});

const user = mongoose.model('user' , userSchema);

module.exports = user;