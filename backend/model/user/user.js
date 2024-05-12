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
  username : {
    type : String,
    unique : true,
  },
  password: {
    type: String,
    required: true,
  },
  messages : [
    {
      pairId : {
        type : String
      },
      message : [
        {
          timeStamp : {
            type: Date,
            default: Date.now,
          },
          message : {
            type : String
          },
          status : {
            type : String
          }
        }
      ]
    }
  ],
});

const user = mongoose.model('user' , userSchema);

module.exports = user;

