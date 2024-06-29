import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';

const steps = [
  {
    id: '0',
    message: 'Hey Geek!',
    trigger: '1',
  },
  {
    id: '1',
    message: 'Please write your username',
    trigger: '2',
  },
  {
    id: '2',
    user: true,
    trigger: '3',
  },
  {
    id: '3',
    message: "Hi {previousValue}, how can I help you?",
    trigger: '4',
  },
  {
    id: '4',
    options: [
      { value: 'adopt_pet', label: 'Adopt a Pet' },
    ],
    trigger: '5',
  },
  {
    id: '5',
    message: "What kind of pet would you like to adopt?",
    trigger: 'adopt_pet_options',
  },
  {
    id: 'adopt_pet_options',
    options: [
      { value: 'dog', label: 'Dog' },
      { value: 'cat', label: 'Cat' },
      { value: 'rabbit', label: 'Rabbit' },
    ],
    trigger: '6',
  },
  {
    id: '6',
    message: "You selected {previousValue}.",
    end: true,
  },
];

const theme = {
  background: '#C9FF8F',
  headerBgColor: '#197B22',
  headerFontSize: '20px',
  botBubbleColor: '#0F3789',
  headerFontColor: 'white',
  botFontColor: 'white',
  userBubbleColor: '#FF5733',
  userFontColor: 'white',
};

const config = {
  botAvatar: "img.png",
  floating: true,
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="GeekBot"
          steps={steps}
          {...config}
        />
      </ThemeProvider>
    </div>
  );
}

export default App;
