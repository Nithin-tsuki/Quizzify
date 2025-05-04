// import React, { useState } from "react";
// import "../styles/chat.css";
// const Chat = ({ friendName = "Friend" }) => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState("");

//   const handleSend = () => {
//     if (!input.trim()) return;
//     const msg = { sender: "You", text: input };
//     setMessages([...messages, msg]);
//     setInput("");
//   };

//   return (
//     <div className="chat-container">
//       <div className="chat-header">Chat with {friendName}</div>
//       <div className="chat-messages">
//         {messages.map((msg, idx) => (
//           <div
//             key={idx}
//             className={`chat-bubble ${msg.sender === "You" ? "user" : "friend"}`}
//           >
//             <strong>{msg.sender}:</strong> {msg.text}
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           placeholder={`Message ${friendName}...`}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === "Enter" && handleSend()}
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// };

// export default Chat;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./chat.css"; // External CSS
 const API_URL = "http://localhost:5001";
const socket = io(API_URL);

const Chat = ({ selectedUser, currentUser }) => {
  console.log("Chat User:", selectedUser);
  console.log("Logged In User:", currentUser);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    socket.emit("joinRoom", { sender: currentUser, receiver: selectedUser });

    socket.on("newMessage", (newMessage) => {
      console.log("Received new message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      fetchMessages(); // Fetch messages again when a new message arrives
    });

    return () => {
      socket.off("newMessage");
    };
  }, [currentUser, selectedUser]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/${currentUser}/${selectedUser}`);
      console.log("Fetched messages:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    console.log("Sending:", currentUser, selectedUser, message);
    if (!message.trim()) return;

    try {
      const newMessage = {
        senderUsername: currentUser,
        receiverUsername: selectedUser,
        text: message,
      };

      await axios.post(`/api/messages/send`, newMessage);
      socket.emit("sendMessage", newMessage);

      setMessage("");
      fetchMessages(); // Fetch messages after sending a message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with {selectedUser}</div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderUsername === currentUser ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
