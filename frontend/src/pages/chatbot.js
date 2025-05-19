import React, { useState, useEffect, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { TbMessageChatbotFilled } from 'react-icons/tb';
import '../styles/chatbot.css';
import botAvatar from '../imagesVideos/nithin-bot.png';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hello! I'm Nithin, your AI Agent here to help with your studies. How may I assist you today?",
    },
  ]);
  const API_KEY=process.env.REACT_APP_API_KEY;
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const botLoadingMessage = { type: 'bot', text: 'Processing your request...' };
    setMessages((prev) => [...prev, botLoadingMessage]);

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer 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`, 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama3-70b-8192', 
          messages: [{ role: 'user', content: input }],
        }),
      });

      const data = await res.json();
      const botReply =
        data.choices?.[0]?.message?.content ||
        data.choices?.[0]?.text ||
        "Sorry, I couldn't understand that.";
        setMessages((prev) => [
        ...prev.slice(0, -1),
        { type: 'bot', text: botReply },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev.slice(0, -1),
        {
          type: 'bot',
          text: `Oops, something went wrong. Please try again later. Error: ${error.message}`,
        },
      ]);
    }

    setInput('');
    setLoading(false);
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
                <h2>
                  Nithin <span className="ai-label">AI</span>
                </h2>
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
            <div ref={messagesEndRef} />
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
