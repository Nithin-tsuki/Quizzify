// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FiUsers, FiMessageSquare } from "react-icons/fi";
// import FriendList from "./FriendList";
// import ChatHeader from "./ChatHeader";
// import ChatMessages from "./ChatMessages";
// import ChatInput from "./ChatInput";
// import Explore from "./Explore";
// import '../style.css';

// const API_URL = "http://localhost:5000";
// const socket = io(API_URL, { transports: ["websocket"] });

// const Social = () => {
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [messagesMap, setMessagesMap] = useState({});
//   const [newMessage, setNewMessage] = useState("");
//   const [showExplore, setShowExplore] = useState(false);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user._id) return;

//     const fetchReceivedMessages = async () => {
//       try {
//         const response = await axios.get(${API_URL}/chat/messages/received/${user._id});
//         setMessagesMap((prevMessages) => ({
//           ...prevMessages,
//           [user._id]: response.data,
//         }));
//       } catch (error) {
//         console.error("Error fetching received messages:", error);
//       }
//     };

//     fetchReceivedMessages();
//   }, []);

//   useEffect(() => {
//     socket.on("receive_message", (message) => {
//       setMessagesMap((prevMessages) => ({
//         ...prevMessages,
//         [message.senderId]: [...(prevMessages[message.senderId] || []), message],
//       }));
//     });

//     return () => socket.off("receive_message");
//   }, []);

//   const handleSelectFriend = async (friend) => {
//     setShowExplore(false);
//     setSelectedFriend(friend);

//     if (!messagesMap[friend._id]) {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || !user._id) return;

//         const response = await axios.get(${API_URL}/chat/${user._id}/${friend._id});
//         setMessagesMap((prev) => ({ ...prev, [friend._id]: response.data }));
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!selectedFriend || !newMessage.trim()) return;
//     const user = JSON.parse(localStorage.getItem("user"));

//     const message = {
//       senderId: user._id,
//       receiverId: selectedFriend._id,
//       text: newMessage,
//     };

//     try {
//       const response = await axios.post(${API_URL}/chat/send, message);
//       const savedMessage = response.data;

//       setMessagesMap((prevMessages) => ({
//         ...prevMessages,
//         [selectedFriend._id]: [...(prevMessages[selectedFriend._id] || []), savedMessage],
//       }));

//       socket.emit("send_message", savedMessage);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <FriendList selectedFriend={selectedFriend} onSelectFriend={handleSelectFriend} />

//       <div className="flex flex-col w-3/4 bg-gray-50 p-6 shadow-lg rounded-lg">
//         {showExplore ? (
//           <Explore onNavigateToChat={() => setShowExplore(false)} />
//         ) : selectedFriend ? (
//           <>
//             <ChatHeader selectedFriend={selectedFriend} />
//             <div className="flex-grow overflow-y-auto p-4 space-y-4">
//               <ChatMessages messages={messagesMap[selectedFriend._id] || []} selectedFriend={selectedFriend} />
//             </div>
//             <div className="mt-4">
//               <ChatInput newMessage={newMessage} onChange={setNewMessage} onSend={handleSendMessage} />
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500 text-center mt-10 text-lg">Select a friend to start chatting</p>
//         )}
//       </div>

//       {/* Explore Button - Moved to Right Side */}
//       <div className="fixed bottom-5 right-[calc(50%-4rem)]">
//         <button
//           onClick={() => setShowExplore(!showExplore)}
//           className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110"
//         >
//           {showExplore ? <><FiMessageSquare size={20} /> Go to Chat</> : <><FiUsers size={20} /> Explore</>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Social;

// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FiUsers, FiMessageSquare } from "react-icons/fi";
// import FriendList from "./FriendList";
// import ChatHeader from "./ChatHeader";
// import ChatMessages from "./ChatMessages";
// import ChatInput from "./ChatInput";
// import Explore from "./Explore";
// import '../style.css';

// const API_URL = "http://localhost:5001";
// const socket = io(API_URL, { transports: ["websocket"] });

// const Social = () => {
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [messagesMap, setMessagesMap] = useState({});
//   const [newMessage, setNewMessage] = useState("");
//   const [showExplore, setShowExplore] = useState(false);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log(user);
//     if (!user || !user.userid) return;

//     const fetchReceivedMessages = async () => {
//       try {
//         const response = await axios.get(${API_URL}/chat/messages/received/${user.userid});
//         setMessagesMap((prevMessages) => ({
//           ...prevMessages,
//           [user.userid]: response.data,
//         }));
//       } catch (error) {
//         console.error("Error fetching received messages:", error);
//       }
//     };

//     fetchReceivedMessages();
//   }, []);

//   useEffect(() => {
//     socket.on("receive_message", (message) => {
//       setMessagesMap((prevMessages) => ({
//         ...prevMessages,
//         [message.senderId]: [...(prevMessages[message.senderId] || []), message],
//       }));
//     });

//     return () => socket.off("receive_message");
//   }, []);

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "http://your-botpress-url.com/webchat/botpress-webchat.js";
//     script.async = true;
//     script.onload = () => {
//       window.botpressWebChat.init({
//         host: "http://your-botpress-url.com",
//         botId: "your-bot-id",
//         botAvatar: "https://your-default-avatar-url.com/avatar.png",
//         userAvatar: "https://your-user-avatar-url.com/user.png",
//         showCloseButton: true,
//         theme: "dark"
//       });
//     };
//     document.body.appendChild(script);
//   }, []);

//   const handleSelectFriend = async (friend) => {
//     setShowExplore(false);
//     setSelectedFriend(friend);

//     if (!messagesMap[friend.userid]) {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || !user.userid) return;

//         const response = await axios.get(${API_URL}/chat/${user.userid}/${friend.userid});
//         setMessagesMap((prev) => ({ ...prev, [friend.userid]: response.data }));
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!selectedFriend || !newMessage.trim()) return;
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log(user.username);
//     const message = {
//       senderId: user.username,
//       receiverId: selectedFriend.username,
//       text: newMessage,
//     };

//     try {
//       const response = await axios.post(${API_URL}/chat/send, message);
//       const savedMessage = response.data;

//       setMessagesMap((prevMessages) => ({
//         ...prevMessages,
//         [selectedFriend.userid]: [...(prevMessages[selectedFriend.userid] || []), savedMessage],
//       }));

//       socket.emit("send_message", savedMessage);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <FriendList selectedFriend={selectedFriend} onSelectFriend={handleSelectFriend} />

//       <div className="flex flex-col w-3/4 bg-gray-50 p-6 shadow-lg rounded-lg">
//         {showExplore ? (
//           <Explore onNavigateToChat={() => setShowExplore(false)} />
//         ) : selectedFriend ? (
//           <>
//             <ChatHeader selectedFriend={selectedFriend} />
//             <div className="flex-grow overflow-y-auto p-4 space-y-4">
//               <ChatMessages messages={messagesMap[selectedFriend.userid] || []} selectedFriend={selectedFriend} />
//             </div>
//             <div className="mt-4">
//               <ChatInput newMessage={newMessage} onChange={setNewMessage} onSend={handleSendMessage} />
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500 text-center mt-10 text-lg">Select a friend to start chatting</p>
//         )}
//       </div>

//       <div className="fixed bottom-5 right-5">
//         <button
//           onClick={() => setShowExplore(!showExplore)}
//           className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110"
//         >
//           {showExplore ? <><FiMessageSquare size={20} /> Go to Chat</> : <><FiUsers size={20} /> Explore</>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Social;

// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FiUsers, FiMessageSquare } from "react-icons/fi";
// import FriendList from "./FriendList";
// import ChatHeader from "./ChatHeader";
// import ChatMessages from "./ChatMessages";
// import ChatInput from "./ChatInput";
// import Explore from "./Explore";
// import '../style.css';

// const API_URL = "http://localhost:5001";
// const socket = io(API_URL, { transports: ["websocket"] });

// const Social = () => {
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [messagesMap, setMessagesMap] = useState({});
//   const [newMessage, setNewMessage] = useState("");
//   const [showExplore, setShowExplore] = useState(false);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log(user);
//     if (!user || !user.userid) return;

//     const fetchReceivedMessages = async () => {
//       try {
//         const response = await axios.get(${API_URL}/chat/messages/received/${user.userid});
//         setMessagesMap((prevMessages) => ({
//           ...prevMessages,
//           [user.userid]: response.data,
//         }));
//       } catch (error) {
//         console.error("Error fetching received messages:", error);
//       }
//     };

//     fetchReceivedMessages();
//   }, []);

//   useEffect(() => {
//     socket.on("receive_message", (message) => {
//       setMessagesMap((prevMessages) => ({
//         ...prevMessages,
//         [message.senderId]: [...(prevMessages[message.senderId] || []), message],
//       }));
//     });

//     return () => socket.off("receive_message");
//   }, []);

//   const handleSelectFriend = async (friend) => {
//     setShowExplore(false);
//     setSelectedFriend(friend);

//     if (!messagesMap[friend.userid]) {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || !user.userid) return;

//         const response = await axios.get(${API_URL}/chat/${user.userid}/${friend.userid});
//         setMessagesMap((prev) => ({ ...prev, [friend.userid]: response.data }));
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!selectedFriend || !newMessage.trim()) return;
//     const user = JSON.parse(localStorage.getItem("user"));
//     console.log(user.username);
//     const message = {
//       senderId: user.username,
//       receiverId: selectedFriend.username,
//       text: newMessage,
//     };

//     try {
//       const response = await axios.post(${API_URL}/chat/send, message);
//       const savedMessage = response.data;

//       setMessagesMap((prevMessages) => ({
//         ...prevMessages,
//         [selectedFriend.userid]: [...(prevMessages[selectedFriend.userid] || []), savedMessage],
//       }));

//       socket.emit("send_message", savedMessage);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <FriendList selectedFriend={selectedFriend} onSelectFriend={handleSelectFriend} />

//       <div className="flex flex-col w-3/4 bg-gray-50 p-6 shadow-lg rounded-lg">
//         {showExplore ? (
//           <Explore onNavigateToChat={() => setShowExplore(false)} />
//         ) : selectedFriend ? (
//           <>
//             <ChatHeader selectedFriend={selectedFriend} />
//             <div className="flex-grow overflow-y-auto p-4 space-y-4">
//               <ChatMessages messages={messagesMap[selectedFriend.userid] || []} selectedFriend={selectedFriend} />
//             </div>
//             <div className="mt-4">
//               <ChatInput newMessage={newMessage} onChange={setNewMessage} onSend={handleSendMessage} />
//             </div>
//           </>
//         ) : (
//           <p className="text-gray-500 text-center mt-10 text-lg">Select a friend to start chatting</p>
//         )}
//       </div>

//       <div className="fixed bottom-5 right-5">
//         <button
//           onClick={() => setShowExplore(!showExplore)}
//           className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-600 transition-transform transform hover:scale-110"
//         >
//           {showExplore ? <><FiMessageSquare size={20} /> Go to Chat</> : <><FiUsers size={20} /> Explore</>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Social;


// import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
// import axios from "axios";
// import { FiUsers, FiMessageSquare } from "react-icons/fi";
// import FriendList from "./FriendList";
// import ChatHeader from "./ChatHeader";
// import ChatMessages from "./ChatMessages";
// import ChatInput from "./ChatInput";
// import Explore from "./Explore";
// import '../styles/social.css';

// const API_URL = "http://localhost:5001";
// const socket = io(API_URL, { transports: ["websocket"] });

// const Social = () => {
//   const [selectedFriend, setSelectedFriend] = useState(null);
//   const [messagesMap, setMessagesMap] = useState({});
//   const [newMessage, setNewMessage] = useState("");
//   const [showExplore, setShowExplore] = useState(false);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (!user || !user.userid) return;

//     const fetchReceivedMessages = async () => {
//       try {
//         const response = await axios.get(${API_URL}/chat/messages/received/${user.userid});
//         setMessagesMap((prevMessages) => ({
//           ...prevMessages,
//           [user.userid]: response.data,
//         }));
//       } catch (error) {
//         console.error("Error fetching received messages:", error);
//       }
//     };

//     fetchReceivedMessages();
//   }, []);

//   useEffect(() => {
//     socket.on("receive_message", (message) => {
//       setMessagesMap((prevMessages) => ({
//         ...prevMessages,
//         [message.senderId]: [...(prevMessages[message.senderId] || []), message],
//       }));
//     });

//     return () => socket.off("receive_message");
//   }, []);

//   const handleSelectFriend = async (friend) => {
//     setShowExplore(false);
//     setSelectedFriend(friend);

//     if (!messagesMap[friend.userid]) {
//       try {
//         const user = JSON.parse(localStorage.getItem("user"));
//         if (!user || !user.userid) return;

//         const response = await axios.get(${API_URL}/chat/${user.userid}/${friend.userid});
//         setMessagesMap((prev) => ({ ...prev, [friend.userid]: response.data }));
//       } catch (error) {
//         console.error("Error fetching messages:", error);
//       }
//     }
//   };

//   const handleSendMessage = async () => {
//     if (!selectedFriend || !newMessage.trim()) return;
//     const user = JSON.parse(localStorage.getItem("user"));

//     const message = {
//       senderId: user.username,
//       receiverId: selectedFriend.username,
//       text: newMessage,
//     };

//     try {
//       const response = await axios.post(${API_URL}/chat/send, message);
//       const savedMessage = response.data;

//       setMessagesMap((prevMessages) => ({
//         ...prevMessages,
//         [selectedFriend.userid]: [...(prevMessages[selectedFriend.userid] || []), savedMessage],
//       }));

//       socket.emit("send_message", savedMessage);
//       setNewMessage("");
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div className="social-container">
//       <FriendList selectedFriend={selectedFriend} onSelectFriend={handleSelectFriend} />

//       <div className="chat-container">
//         {showExplore ? (
//           <Explore onNavigateToChat={() => setShowExplore(false)} />
//         ) : selectedFriend ? (
//           <>
//             <ChatHeader selectedFriend={selectedFriend} />
//             <div className="chat-messages">
//               <ChatMessages messages={messagesMap[selectedFriend.userid] || []} selectedFriend={selectedFriend} />
//             </div>
//             <div className="chat-input">
//               <ChatInput newMessage={newMessage} onChange={setNewMessage} onSend={handleSendMessage} />
//             </div>
//           </>
//         ) : (
//           <p className="no-friend-text">Select a friend to start chatting</p>
//         )}
//       </div>

//       <div className="explore-btn-container">
//         <button
//           onClick={() => setShowExplore(!showExplore)}
//           className="explore-btn"
//         >
//           {showExplore ? <><FiMessageSquare size={20} /> Go to Chat</> : <><FiUsers size={20} /> Explore</>}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Social;


import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { FiUsers, FiMessageSquare } from "react-icons/fi";
import FriendList from "./FriendList";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import Explore from "./Explore";
import '../styles/social.css';

const API_URL = "http://localhost:5001";
const socket = io(API_URL, { transports: ["websocket"] });

const Social = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [messagesMap, setMessagesMap] = useState({});
  const [newMessage, setNewMessage] = useState("");
  const [showExplore, setShowExplore] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userid) return;

    const fetchReceivedMessages = async () => {
      try {
        const response = await axios.get(`${API_URL}/chat/messages/received/${user.userid}`);
        setMessagesMap((prevMessages) => ({
          ...prevMessages,
          [user.userid]: response.data,
        }));
      } catch (error) {
        console.error("Error fetching received messages:", error);
      }
    };

    fetchReceivedMessages();
  }, []);

  useEffect(() => {
    // socket.on("receive_message", (message) => {
    //   const currentUser = JSON.parse(localStorage.getItem("user"));
    //   const friendId =
    //     message.senderId === currentUser._id ? message.receiverId : message.senderId;
    
    //   const key = typeof friendId === "object" ? friendId._id : friendId; // fallback
    
    //   setMessagesMap((prevMessages) => ({
    //     ...prevMessages,
    //     [key]: [...(prevMessages[key] || []), message],
    //   }));
    // });
    

    // return () => socket.off("receive_message");
    socket.on("newMessage", (message) => {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      const friendId =
        message.senderId === currentUser.userid ? message.receiverId : message.senderId;
    
      const key = typeof friendId === "object" ? friendId._id : friendId;
    
      setMessagesMap((prevMessages) => ({
        ...prevMessages,
        [key]: [...(prevMessages[key] || []), message],
      }));
    });
    
    return () => socket.off("newMessage"); // Make sure you clean up
    
  }, []);

  const handleSelectFriend = async (friend) => {
    setShowExplore(false);
    setSelectedFriend(friend);
  
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || !user.userid) return;
  
    // Join room when a friend is selected
    socket.emit("joinRoom", {
      sender: user.userid,
      receiver: friend._id,
    });
  
    if (!messagesMap[friend._id]) {
      try {
        const response = await axios.get(`${API_URL}/chat/${user.userid}/${friend._id}`);
        setMessagesMap((prev) => ({ ...prev, [friend._id]: response.data }));
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    }
  };
  
  const handleDeleteMessage = (messageId) => {
    if (!selectedFriend || !messagesMap[selectedFriend._id]) return;
  
    setMessagesMap((prev) => ({
      ...prev,
      [selectedFriend._id]: prev[selectedFriend._id].filter((msg) => msg._id !== messageId),
    }));
  };
  
  const handleSendMessage = async () => {
    if (!selectedFriend || !newMessage.trim()) return;
    const user = JSON.parse(localStorage.getItem("user"));

    const message = {
      senderId: user.userid,
      receiverId: selectedFriend._id,
      text: newMessage,
    };

    try {
      const response = await axios.post(`${API_URL}/chat/send`, message);
      const savedMessage = response.data;

      // setMessagesMap((prevMessages) => ({
      //   ...prevMessages,
      //   [selectedFriend._id]: [...(prevMessages[selectedFriend._id] || []), savedMessage],
      // }));
      

      socket.emit("sendMessage", savedMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="s-container">
      {/* Friends List on the left */}
      <div className="s-friends-list">
        <FriendList selectedFriend={selectedFriend} onSelectFriend={handleSelectFriend} />
      </div>

      {/* Chat Section on the right */}
      <div className="s-chat-section">
        {showExplore ? (
          <Explore onNavigateToChat={() => setShowExplore(false)} />
        ) : selectedFriend ? (
          <>
            <ChatHeader selectedFriend={selectedFriend} />
            <div className="s-message-box">
            <ChatMessages
  messages={messagesMap[selectedFriend._id] || []}
  selectedFriend={selectedFriend}
  onDeleteMessage={handleDeleteMessage}
/>

            </div>
            <div className="s-input-area">
              <ChatInput newMessage={newMessage} onChange={setNewMessage} onSend={handleSendMessage} />
            </div>
          </>
        ) : (
          <p className="s-placeholder">Select a friend to start chatting</p>
        )}
      </div>

      {/* Explore Button in the bottom left */}
      <div className="s-explore-btn-container">
        <button
          onClick={() => setShowExplore(!showExplore)}
          className="s-explore-btn"
        >
          {showExplore ? <><FiMessageSquare size={20} /> Go to Chat</> : <><FiUsers size={20} /> Explore</>}
        </button>
      </div>
    </div>
  );
};

export default Social;