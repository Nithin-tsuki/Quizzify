import React, { useState } from "react";
import "../styles/chat.css";

const GCChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("Student123");

  const handleSend = () => {
    if (!input.trim()) return;
    const msg = { sender: username, text: input };
    setMessages([...messages, msg]);
    setInput("");
  };

  return (
    <div className="gcchat-container">
      <div className="chat-header">📢 Global Chatroom</div>
      <div className="chat-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className="chat-bubble global">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Share something with everyone..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default GCChat;
