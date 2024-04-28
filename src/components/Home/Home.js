import React, { useEffect , useState } from "react";
import ChatRoom from '../ViewComponents/ChatRoom'
import socket from "../socket/Socket";
import Header from "../ViewComponents/Header";
import Users from '../ViewComponents/Users'

const Home = ({ loggedInUserName , loggedInUserID , handleLogout}) => {
  const [recipientUserId, setRecipientUserId] = useState("");

  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("mapUserIdToSocketId", loggedInUserID );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    console.log(recipientUserId);
    socket.emit("sendMessage", { newMessage : message , senderId : loggedInUserID ,  receiverId : recipientUserId});
  };

  const handleChat = async (id) => {
    
    setRecipientUserId(id);
  };

  return (
    <div className="h-screen">
      <div>
        <Header name={loggedInUserName} handleLogout={handleLogout}/>
      </div>
      <div className="grid grid-cols-5">
        <div className="col-span-2">
          <Users userId = {loggedInUserID} handleChat = {handleChat}  />
        </div>
        <div className="col-span-3">
          <ChatRoom
            id={recipientUserId}
            message={message}
            handleMessageChange={handleMessageChange}
            sendMessage={() => sendMessage(recipientUserId, message)}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
