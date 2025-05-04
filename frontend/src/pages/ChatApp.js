
import React, { useEffect, useState } from "react";
import axios from "axios";
import Chat from "./chat";
import "./chat.css";

const ChatApp = () => {
  const currentUser = localStorage.getItem("username");
  const [friends, setFriends] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        console.log("Fetching friends for user:", currentUser);
        const { data } = await axios.get(`http://localhost:5001/api/chat/friends/${currentUser}`);
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };

    if (currentUser) {
      fetchFriends();
    }
  }, [currentUser]);

  return (
    <div className="chat-app">
      <div className="friends-list">
        <h3>Friends</h3>
        {friends.map((friend) => (
          <div
            key={friend._id}
            className={`friend-item ${selectedUser === friend.username ? "active" : ""}`}
            onClick={() => setSelectedUser(friend.username)}
          >
            {friend.username}
          </div>
        ))}
      </div>
      <div className="chat-section">
        {selectedUser ? (
          <Chat selectedUser={selectedUser} />
        ) : (
          <div className="no-chat-selected">Select a friend to chat</div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
