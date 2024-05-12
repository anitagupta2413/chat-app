const express = require("express");
const connectDB = require("./connection/connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Socket = require("socket.io");
const http = require("http");
const router = require("./routes/routes");

const app = express();
const server = http.createServer(app);
const io = Socket(server);

connectDB("mongodb://127.0.0.1:27017/chatApp");

app.use(cookieParser());
app.use(cors());
app.use(express.json());
app.use("/api", router);

const onLineUsers = {};
const offLineUsers = {};

io.on("connection", (socket) => {
  
  socket.on("mapUserIdToSocketId", (user_id) => {
    onLineUsers[user_id] = socket.id;

    if (offLineUsers.hasOwnProperty(user_id)) {
      if (offLineUsers[user_id].length > 0) {
        const recepitentSocketId = onLineUsers[user_id];
        offLineUsers[user_id].map((undeleviredMessages) => {
          io.to(recepitentSocketId).emit("received", undeleviredMessages);
        });
      }
    }
  });

  socket.on("send", (newMessage) => {
    const { receivedBy } = newMessage;
    const recipientSocketId = onLineUsers[receivedBy];

    if (recipientSocketId) {
      io.to(recipientSocketId).emit("received", newMessage);
    } else {
      const exits = offLineUsers.hasOwnProperty(receivedBy);
      if (exits) {
        offLineUsers[receivedBy].push(newMessage);
      } else {
        offLineUsers[receivedBy] = [newMessage];
      }
    }
  });

  socket.on("disconnect", () => {
    for (user_id in onLineUsers) {
      if (onLineUsers[user_id] === socket.id) {
        delete onLineUsers[user_id];
        break;
      }
    }
  });
});

server.listen("8000", () => {
  console.log("server started");
});
