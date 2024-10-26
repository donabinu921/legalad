import React, { useState } from 'react';
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const LegChatbot = () => {
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      message: "Hello, I am the Legal Chatbot.",
      sender: "bot"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "me",
      direction: "outgoing"
    };

    const newMessages = [...messages, newMessage];
    setMessages(newMessages);
    
    setTyping(true);
  };

  return (
    <div style={{ position: "relative", height: "100vh", width: "80vw" }}>
      <MainContainer>
        <ChatContainer>       
          <MessageList
            typingIndicator={typing ? <TypingIndicator content="Bot is typing" /> : null}
          >
            {messages.map((message, i) => (
              <Message key={i} model={message} />
            ))}
          </MessageList>
          <MessageInput placeholder="Type message here" onSend={handleSend} />        
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default LegChatbot;