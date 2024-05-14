import React from "react";
import axios from "axios";
import { Avatar } from "@mui/material";

const ChatRoom = ({
  userId,
  pair,
  allMessages,
  noMessagesAvailable,
  sendMessage,
  handleMessageChange,
  message,
  handleClearChat
}) => {

  return (
    <div className="h-screen">
      <div className="h-1/6">
        <header className="bg-purple-800 text-white py-4 h-full">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex flex-row items-end justify-end gap-2">
              <Avatar
                style={{
                  zIndex: 1,
                  backgroundColor: "white",
                  color: "#8B5CF6",
                }}
              >
                {pair.name.charAt(0).toUpperCase()}
              </Avatar>
              <h4 className="text-xl font-bold">{pair.name}</h4>
            </div>
            <button className="bg-white text-black p-2 rounded-md" onClick={handleClearChat}>clear chat</button>
          </div>
        </header>
      </div>
      <div
        className="h-4/6 bg-gray-100 opacity-75"
        style={{ overflow: "hidden" }}
      >
        {noMessagesAvailable ? (
          <div className="h-full flex items-center justify-center">
            <p className="bg-white inline-block px-4 py-2 shadow-custom text-black rounded-md">
              start your first conversation
            </p>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-full scrollbar-hide">
            {allMessages?.map((messages, index) => (
              <div key={index} className={`px-4 py-2 ${messages.status == "sent" ? 'flex justify-end' : 'flex justify-start'}`}>
                {messages.status == "sent" ? (
                  <div className="w-1/2 flex justify-end">
                    <div className="inline-block bg-purple-800 rounded-md p-1 shadow-custom">
                      <span className="text-white break-all">{messages.message}</span>
                    </div>
                  </div>
                ) : (
                  <div className="w-1/2 flex justify-start">
                    <div className="inline-block bg-white rounded-md p-1 shadow-custom">
                      <span className="text-black break-all">{messages.message}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="h-1/6 bg-purple-100 p-4 flex justify-between item-center">
        <input
          className="w-9/12 border rounded-md px-2 py-3"
          type="text"
          value={message}
          onChange={handleMessageChange}
          placeholder="Type your message..."
        />
        <button
          type="submit"
          className="bg-purple-500 text-white py-3 px-4 rounded w-2/12 "
          onClick={() => sendMessage(message)}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
