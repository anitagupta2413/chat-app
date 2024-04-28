import React, { useEffect, useState } from "react";
import socket from "../socket/Socket";

const ChatRoom = ({ id, message, handleMessageChange, sendMessage }) => {
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const handleMessageReceived = (messages) => {
      setReceivedMessages((prevMessages) => [...prevMessages, messages]);
    };
    socket.on("receivedMessage", handleMessageReceived);

    return () => {
      socket.off("receivedMessage", handleMessageReceived);
    };
  }, []);

  return (
    <div>
      <div>
        <h1>{id}</h1>
      </div>
      <div>
        <ul>
          {receivedMessages.map((messages, index) => (
            <li key={index}>{messages}</li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <button
          className="bg-green-500 text-white py-2 px-4 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
