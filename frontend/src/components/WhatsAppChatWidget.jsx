import React, { useState, useRef, useEffect } from 'react';
import './WhatsAppChatWidget.css';

const WhatsAppChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: 'Hi there! 👋 Welcome to Gauranga Organic Farm. How can we help you today?', isBot: true }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg = inputValue;
    setMessages(prev => [...prev, { text: userMsg, isBot: false }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('http://localhost:8080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMsg }),
      });
      
      const data = await response.json();
      
      // Simulate network delay for realism
      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, { text: data.reply || 'Sorry, I am having trouble connecting right now.', isBot: true }]);
      }, 1000);

    } catch (error) {
      setIsTyping(false);
      setMessages(prev => [...prev, { text: 'Sorry, I could not connect to the server.', isBot: true }]);
    }
  };

  return (
    <div className="wa-widget-container">
      {/* The Chat Window */}
      <div className={`wa-chat-window ${isOpen ? 'open' : ''}`}>
        <div className="wa-header">
          <div className="wa-header-info">
            <i className="fab fa-whatsapp" style={{ fontSize: '1.5rem', marginRight: '10px' }}></i>
            <div>
              <strong>Gauranga Farm AI</strong>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Typically replies instantly</div>
            </div>
          </div>
          <button onClick={toggleChat} className="wa-close-btn">&times;</button>
        </div>
        
        <div className="wa-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`wa-message-row ${msg.isBot ? 'bot' : 'user'}`}>
              <div className={`wa-message ${msg.isBot ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="wa-message-row bot">
              <div className="wa-message bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="wa-input-area" onSubmit={handleSendMessage}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="wa-send-btn">
            <i className="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>

      {/* Floating Button */}
      {!isOpen && (
        <button className="wa-floating-btn" onClick={toggleChat} aria-label="Chat with AI">
          <i className="fab fa-whatsapp"></i>
        </button>
      )}
    </div>
  );
};

export default WhatsAppChatWidget;
