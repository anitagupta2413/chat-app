const express = require("express");
const connectDB = require("./connection/connection");
const router = require("./routes/routes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Socket = require("socket.io");
const http = require("http");
const {updateRecipient , updateSender} = require('./controller/user/storingMessages');


const app = express();
const server = http.createServer(app);
const io = Socket(server);

connectDB("mongodb://127.0.0.1:27017/chatApp");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/user", router);
app.use("/messages" , router);

const connectedUsers = {};

io.on("connection", (socket) => {
  console.log("a new client connected", socket.id);
  socket.on("mapUserIdToSocketId", (user_id) => {
    connectedUsers[user_id] = socket.id;
    console.log('while connecting' , connectedUsers)
  });

  socket.on('disconnect', () => {
    for( user_id in connectedUsers){
      if(connectedUsers[user_id] === socket.id){
        delete connectedUsers[user_id];
        break;
      }
    }
  })

  socket.on("sendMessage", ({ newMessage , senderId , receiverId }) => {
    const recipientSocketId = connectedUsers[receiverId];

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("receivedMessage", newMessage);
    } 
    else {
      console.log(`Recipient with ID ${recipetentId} is not connected.`);
    }

    updateRecipient(newMessage , senderId , receiverId);
      updateSender(newMessage , senderId , receiverId);

  });


});

server.listen("8000", () => {
  console.log("server started");
});
