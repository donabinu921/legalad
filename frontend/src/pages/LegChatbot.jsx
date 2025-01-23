import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import FormattedText from "../components/FormattedText";
import axios from "axios";

// Initialize the API
const genAI = new GoogleGenerativeAI(`${process.env.REACT_APP_GEMINI_API_KEY}`);

// Replace mockGeminiAPI with this function
const sendToGemini = async (message) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
      "You are a legal advisor. You will provide answers to queries based on the ruleset used in  India. Do not answer vaguely. Give clear concise steps on how the user can proceed in that situation. Refer to yourself as legal advisor. Don't specify the need for a lawyer unless the user asks for it. Ask the user for more details one query at a time.",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
    });
    
    const chat = model.startChat({
      history: [],
      generationConfig: { temperature: 0.9 },
    });
    
    const result = await chat.sendMessage(message);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

const LegChatbot = () => {
  const userId = window.localStorage.getItem("USER");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const clearChat = async () => {
    console.log('Clearing chat...');
    await axios.post(`http://localhost:5000/api/conversations/${userId}/clear`)
      .then((response) => {
        console.log(response.data);
        setMessages([]);
      });
  };


  const getUserChat = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/conversations/${userId}`
      );

      // Check if response.data is an array and map the messages
      const messages = response.data.map((conversation) => conversation.messages).flat() || [];
      return messages; // Return the mapped messages array
    } catch (error) {
      console.error("Error fetching user chat:", error);
      return []; // Return an empty array on error
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const msgs = await getUserChat(userId);
      setMessages(msgs);
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => 
    {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setIsLoading(true);

    try {
      // Replace this with actual API call to Gemini
      const response = await sendToGemini(`New message:${userMessage} previous messages: ${JSON.stringify(messages)}`);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: response },
      ]);

      
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I apologize, but I encountered an error. Please try again.",
        },
      ]);

      }
      await axios.post(`http://localhost:5000/api/conversations/${userId}/messages`, 
        { messages }
      ).then((response) => {
        console.log(response.data);
      }
      );
    
    setIsLoading(false);
  };

  return (
    <div
      className="chat-container"
      style={{
        minWidth: "100%",
        margin: "0 auto",
        minHeight: "90vh",
        border: "1px solid #ddd",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      <div
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ddd",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "1.25rem",
          color: "#0B57D0",
        }}
      >
        Legal Advisor Chat
      </div>

      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <div
              style={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: message.role === "user" ? "#2563eb" : "#059669",
              }}
            >
              {message.role === "user" ? "Your Query:" : "Legal Advisor:"}
            </div>
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor:
                  message.role === "user" ? "#eff6ff" : "#f0fdf4",
                border: `1px solid ${
                  message.role === "user" ? "#bfdbfe" : "#bbf7d0"
                }`,
                whiteSpace: "pre-wrap",
              }}
            >
              {message.content}
              {/* <FormattedText text={message.content} /> */}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ marginBottom: "1rem" }}>
            <div
              style={{
                fontWeight: "600",
                marginBottom: "0.5rem",
                color: "#0B57D0",
              }}
            >
              Legal Advisor:
            </div>
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: "#f0fdf4",
                border: "1px solid #bbf7d0",
              }}
            >
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={sendMessage}
        style={{
          padding: "1rem",
          borderTop: "1px solid #ddd",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your legal question..."
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "0.375rem",
            border: "1px solid #ddd",
            outline: "none",
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
            disabled: isLoading ? "opacity: 0.5" : "",
          }}
        >
          Send
        </button>
        <button
          disabled={isLoading}
          onClick={clearChat}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer',
            disabled: isLoading ? 'opacity: 0.5' : ''
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default LegChatbot;
