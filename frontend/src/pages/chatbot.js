// import React, { useState } from 'react';
// import { FaTimes, } from 'react-icons/fa';
// import { TbMessageChatbotFilled } from "react-icons/tb";
// import '../styles/chatbot.css';
// import botAvatar from '../imagesVideos/nithin-bot.png'; // Ensure this image exists

// const ChatBot = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [messages, setMessages] = useState([
//     { type: 'bot', text: "Hello! I'm Nithin, your AI Agent here to help with your studies. How may I assist you today?" }
//   ]);
//   const [input, setInput] = useState('');
//   const [loading, setLoading] = useState(false);

//   const toggleChat = () => setIsOpen(!isOpen);

//   const sendMessage = async () => {
//     if (!input.trim()) return;

//     const userMessage = { type: 'user', text: input };
//     setMessages(prev => [...prev, userMessage]);
//     setLoading(true);

//     // Add bot loading message
//     const botLoadingMessage = { type: 'bot', text: 'Processing your request...' };
//     setMessages(prev => [...prev, botLoadingMessage]);

//     try {
//       const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//           Authorization: 'Bearer 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',
//           'HTTP-Referer': 'https://www.webstylepress.com',
//           'X-Title': 'wsp',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           model: 'deepseek/deepseek-r1:free',
//           messages: [{ role: 'user', content: input }]
//         })
//       });

//       const data = await res.json();
//       const botReply = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t understand that. Could you please rephrase?';

//       // Post-process to improve readability
//       const formattedReply = formatBotResponse(botReply);

//       // Replace the loading message with the bot's response
//       setMessages(prev => [
//         ...prev.slice(0, -1),  // Remove the 'Processing...' message
//         { type: 'bot', text: formattedReply }
//       ]);
//     } catch (error) {
//       setMessages(prev => [
//         ...prev.slice(0, -1),  // Remove the 'Processing...' message in case of error
//         { type: 'bot', text: `Oops, something went wrong. Please try again later. Error: ${error.message}` }
//       ]);
//     }

//     setInput('');
//     setLoading(false);
//   };

//   // Function to format bot's response for better readability
//   const formatBotResponse = (response) => {
//     // Split response into paragraphs or bullet points for better readability
//     const formattedResponse = response.split('\n').map((paragraph, index) => {
//       return (
//         <p key={index}>{paragraph}</p>
//       );
//     });

//     return formattedResponse;
//   };

//   return (
//     <div>
//       <div className="chat-toggle-button">
//         <button onClick={toggleChat} style={{ backgroundColor: '#394867' }}>
//         <TbMessageChatbotFilled size={40}/>
//         </button>
//       </div>

//       {isOpen && (
//         <div className="chat-box" style={{ backgroundColor: '#394867' }}>
//           <div className="chat-header">
//             <div className="chat-header-left">
//               <img src={botAvatar} alt="Nithin Bot" className="bot-avatar" />
//               <div>
//                 <h2>Nithin <span className="ai-label">AI</span></h2>
//                 <p>Student Support Assistant</p>
//               </div>
//             </div>
//             <button onClick={toggleChat}>
//               <FaTimes />
//             </button>
//           </div>

//           <div className="chat-messages">
//             {messages.map((msg, i) => (
//               <div
//                 key={i}
//                 className={`chat-message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
//               >
//                 {msg.text}
//               </div>
//             ))}
//           </div>

//           <div className="chat-input">
//             <input
//               type="text"
//               placeholder="Type here"
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
//               disabled={loading}
//             />
//             <button onClick={sendMessage} disabled={loading}>
//               ➤
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatBot;
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { TbMessageChatbotFilled } from "react-icons/tb";
import '../styles/chatbot.css';
import botAvatar from '../imagesVideos/nithin-bot.png'; // Ensure this image exists

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: "Hello! I'm Nithin, your AI Agent here to help with your studies. How may I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const toggleChat = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    // Add bot loading message
    const botLoadingMessage = { type: 'bot', text: 'Processing your request...' };
    setMessages(prev => [...prev, botLoadingMessage]);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer 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`, 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192', // Recommended Groq model for chat
          messages: [
            { role: 'user', content: input }
          ]
        })
      });

      const data = await res.json();
      const botReply = data.choices?.[0]?.message?.content || 'Sorry, I couldn\'t understand that. Could you please rephrase?';

      // Post-process to improve readability
      const formattedReply = formatBotResponse(botReply);

      // Replace the loading message with the bot's response
      setMessages(prev => [
        ...prev.slice(0, -1),
        { type: 'bot', text: formattedReply }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev.slice(0, -1),
        { type: 'bot', text: `Oops, something went wrong. Please try again later. Error: ${error.message}` }
      ]);
    }

    setInput('');
    setLoading(false);
  };

  const formatBotResponse = (response) => {
    const formattedResponse = response.split('\n').map((paragraph, index) => {
      return (
        <p key={index}>{paragraph}</p>
      );
    });

    return formattedResponse;
  };

  return (
    <div>
      <div className="chat-toggle-button">
        <button onClick={toggleChat} style={{ backgroundColor: '#394867' }}>
          <TbMessageChatbotFilled size={40} />
        </button>
      </div>

      {isOpen && (
        <div className="chat-box" style={{ backgroundColor: '#394867' }}>
          <div className="chat-header">
            <div className="chat-header-left">
              <img src={botAvatar} alt="Nithin Bot" className="bot-avatar" />
              <div>
                <h2>Nithin <span className="ai-label">AI</span></h2>
                <p>Student Support Assistant</p>
              </div>
            </div>
            <button onClick={toggleChat}>
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chat-message ${msg.type === 'user' ? 'user-message' : 'bot-message'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              placeholder="Type here"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              disabled={loading}
            />
            <button onClick={sendMessage} disabled={loading}>
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
