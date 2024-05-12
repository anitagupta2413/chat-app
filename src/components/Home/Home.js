import React, { useEffect, useState } from "react";
import ChatRoom from "../ViewComponents/ChatRoom";
import socket from "../socket/Socket";
import Users from "../ViewComponents/Users";
import axios from "axios";
import { decryptMessage, encryptMessage } from "../../encryption/aes";

const Home = ({
  loggedInUserName,
  loggedInUserID,
  handleLogout,
  handleDeleteAccount,
}) => {
  const [recipientUserId, setRecipientUserId] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [isloading, setIsLoading] = useState(true);
  const [noMessagesAvailable, setNoMessagesAvailable] = useState(false);
  const [message, setMessage] = useState("");

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = async () => {
    const newMessage = {
      sendBy: loggedInUserID,
      receivedBy: recipientUserId,
      message: encryptMessage(message),
      timeStamp: new Date().toISOString(),
      status: "sent",
    };

    await axios
      .patch("http://localhost:8000/api/store/sentMessages", newMessage)
      .then((response) => {
        if (response.data.success) {
          socket.emit("send", newMessage);
          const dcryptedMessage = {
            ...newMessage,
            message: decryptMessage(newMessage.message),
          };
          setAllMessages((prev) => [...prev, dcryptedMessage]);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleMessageReceived = async (newMessage) => {
    const receivedMessage = {
      ...newMessage,
      status: "received",
    };
    await axios
      .patch("http://localhost:8000/api/store/receivedMessages", receivedMessage)
      .then((response) => {
        if (response.data.success) {
          const decryptedReceivedMessage = {
            ...receivedMessage,
            message: decryptMessage(receivedMessage.message),
          };
          setAllMessages((prev) => [...prev, decryptedReceivedMessage]);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      socket.emit("mapUserIdToSocketId", loggedInUserID);
    });
    socket.on("received", handleMessageReceived);

    return () => {
      socket.disconnect();
      socket.off("received", handleMessageReceived);
    };
  }, []);

  const handleChat = async (id) => {
    setRecipientUserId(id);
    await axios
      .get("http://localhost:8000/api/fetchMessages", {
        params: {
          userId: loggedInUserID,
          pairId: id,
        },
      })
      .then((response) => {
        if (response.data.response.length <= 0) {
          setNoMessagesAvailable(true);
          setIsLoading(false);
        } else {
          setNoMessagesAvailable(false);
          const allMessages = response.data.response[0].message.map((item) => {
            return {
              ...item,
              message: decryptMessage(item.message),
            };
          });
          setAllMessages(allMessages);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 overflow-hidden">
        <Users
          userId={loggedInUserID}
          handleChat={handleChat}
          loggedInUserName={loggedInUserName}
          handleLogout={handleLogout}
          handleDeleteAccount={handleDeleteAccount}
        />
      </div>
      <div className="w-2/3 overflow-hidden">
        {!isloading && (
          <ChatRoom
            pairId={recipientUserId}
            allMessages={allMessages}
            userId={loggedInUserID}
            noMessagesAvailable={noMessagesAvailable}
            sendMessage={sendMessage}
            handleMessageChange={handleMessageChange}
            message={message}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
