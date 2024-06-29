import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState(''); // State to hold input text

  const handleUserMessage = (text) => {
    const botResponse = getBotResponse(text);
    setMessages([...messages, { text, isUser: true }]);
    if (botResponse) {
      setMessages([...messages, { text: botResponse, isUser: false }]);
    }
    setInputText(''); // Clear input text after sending message
  };

  const getBotResponse = (input) => {
    const responses = [
      {
        question: 'Hi! Welcome to Pet Adoption Center. How can I help you today?',
        options: ['Adopt a pet'],
      },
      {
        question: 'What type of pet are you interested in adopting?',
        options: ['Dog', 'Cat', 'Other'],
      },
      {
        question: 'Do you have any specific questions about the adoption process?',
        options: ['Yes', 'No'],
      },
      {
        question: 'Thank you for considering adoption! Visit our website for more information.',
        options: [],
      },
    ];

    const response = responses[messages.length]; // Use messages length to determine stage
    if (response) {
      if (response.options && response.options.length > 0) {
        return response.options.map((option, index) => (
          <button key={index} onClick={() => handleOptionClick(option)}>{option}</button>
        ));
      } else {
        return response.question;
      }
    }
    return 'I am sorry, I do not understand.';
  };

  const handleOptionClick = (option) => {
    const botResponse = getBotResponse(option);
    setMessages([...messages, { text: option, isUser: true }]);
    if (botResponse) {
      setMessages([...messages, { text: botResponse, isUser: false }]);
    }
  };

  return (
    <div className="chatbot">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.isUser ? 'user' : 'bot'}`}>
            <p>{message.text}</p>
          </div>
        ))}
      </div>
      {getBotResponse('').options && (
        <div className="options">
          {getBotResponse('').options}
        </div>
      )}
      <input
        type="text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleUserMessage(inputText)}
        placeholder="Type your message..."
      />
      <button onClick={() => handleUserMessage(inputText)}>Send</button>
    </div>
  );
};

export default Chatbot;
