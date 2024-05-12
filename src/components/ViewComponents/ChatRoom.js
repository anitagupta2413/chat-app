import React from "react";
import axios from "axios";

const ChatRoom = ({
  userId,
  pairId,
  allMessages,
  noMessagesAvailable,
  sendMessage,
  handleMessageChange,
  message,
}) => {
  const handleClearChat = async () => {
    try {
      await axios
        .patch("http://localhost:8000/api/deleteMessages", {
          userId: userId,
          pairId: pairId,
        })
        .then((response) => {
          if (response.data.success) {
            alert(response.data.message);
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-screen">
      <div className="h-1/6">
        <header className="bg-purple-800 text-white py-4 h-full">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">{pairId}</h1>
            <button onClick={handleClearChat}>clear chat</button>
          </div>
        </header>
      </div>
      <div
        className="h-4/6 bg-gray-100 opacity-75"
        style={{ overflow: "hidden" }}
      >
        {noMessagesAvailable ? (
          <div>
            <h1>no messages are available</h1>
          </div>
        ) : (
          <div className="overflow-y-auto max-h-full scrollbar-hide">
            {allMessages?.map((messages, index) => (
              <div
                style={
                  messages.status === "sent" ? styles.sent : styles.received
                }
                key={index}
                className="mt-2 p-2"
              >
                <div className="w-50">
                  <div
                    className="inline-block p-2 rounded-md"
                    style={
                      messages.status === "sent"
                        ? styles.sentInner
                        : styles.receivedInner
                    }
                  >
                    <span>{messages.message}</span>
                    <span>{messages.timeStamp}</span>
                  </div>
                </div>
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
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  sent: {
    display: "flex",
    justifyContent: "flex-end",
  },
  received: {
    display: "flex",
    justifyContent: "flex-start",
  },
  sentInner: {
    display: "flex",
    justifyContent: "flex-end",
    backgroundColor: "blue",
  },
  receivedInner: {
    display: "flex",
    justifyContent: "flex-start",
    backgroundColor: "white",
  },
};

export default ChatRoom;
