import React, { useState } from 'react';
import './App.css';
import Chatbot from './Chatbot.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Chatbot</h1>
      </header>
      <main>
        <Chatbot />
      </main>
    </div>
  );
}

export default App;
