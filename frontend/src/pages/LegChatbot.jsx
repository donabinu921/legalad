import React, { useState, useRef, useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import ReactMarkdown from 'react-markdown';

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY || "");

const sendToGemini = async (message, history) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction:
        "You are pretending to be a legal advisor. You will provide answers to queries based on the ruleset used in India. Do not answer vaguely. Give clear steps on how the user can proceed in that situation. Refer to yourself as legal advisor. Only provide the legal side of the queries.",
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
      },
    });

    const formattedHistory = history.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: { temperature: 0.9 },
    });

    const result = await chat.sendMessage(message);
    return result.response.text();
  } catch (error) {
    console.error("Gemini API Error:", error.message);
    throw new Error("Failed to get response from Gemini API");
  }
};

const LegChatbot = () => {
  const userId = window.localStorage.getItem("USER") || "default-user";
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const saveMessagesToBackend = async (updatedMessages) => {
    try {
      const response = await axios.post(`http://localhost:5000/api/conversations/${userId}`, {
        messages: updatedMessages,
      });
      console.log("Messages saved:", response.data);
    } catch (error) {
      console.error("Failed to save messages:", error.response?.data || error.message);
      setError("Failed to save conversation");
    }
  };

  const clearChat = async () => {
    setIsLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/conversations/${userId}/clear`);
      setMessages([]);
      setError(null);
      console.log("Chat cleared successfully");
    } catch (error) {
      console.error("Error clearing chat:", error.response?.data || error.message);
      setError("Failed to clear chat");
    }
    setIsLoading(false);
  };

  const getUserChat = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/conversations/${userId}`);
      console.log("Fetched messages:", response.data);
      const fetchedMessages = Array.isArray(response.data) ? response.data : [];
      setMessages(fetchedMessages);
      setError(null);
    } catch (error) {
      console.error("Error fetching chat:", error.response?.data || error.message);
      setError("Failed to load previous messages");
      setMessages([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserChat();
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { 
      role: "user", 
      content: inputMessage.trim(), 
      timestamp: new Date().toISOString() 
    };
    
    setInputMessage("");
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendToGemini(userMessage.content, messages);
      const assistantMessage = { 
        role: "assistant", 
        content: response, 
        timestamp: new Date().toISOString() 
      };
      
      setMessages(prev => {
        const updatedMessages = [...prev, assistantMessage];
        saveMessagesToBackend(updatedMessages);
        return updatedMessages;
      });
    } catch (error) {
      console.error("Send message error:", error);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "Error: Could not get a response. Please try again.",
        timestamp: new Date().toISOString()
      }]);
      setError("Failed to get response from legal advisor");
    }
    setIsLoading(false);
  };

  return (
    <div className="chat-container" style={{
      minWidth: "100%",
      margin: "0 auto",
      minHeight: "90vh",
      border: "1px solid #ddd",
      borderRadius: "8px",
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
    }}>
      <div style={{
        padding: "1rem",
        borderBottom: "1px solid #ddd",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "1.25rem",
        color: "#0B57D0",
      }}>
        Legal Advisor Chat
      </div>

      {error && (
        <div style={{ padding: "1rem", color: "red", textAlign: "center" }}>
          {error}
        </div>
      )}

      <div style={{
        flex: 1,
        overflowY: "auto",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: "1rem" }}>
            <div style={{
              fontWeight: "600",
              marginBottom: "0.5rem",
              color: message.role === "user" ? "#2563eb" : "#059669",
            }}>
              {message.role === "user" ? "Your Query:" : "Legal Advisor:"}
            </div>
            <div style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: message.role === "user" ? "#eff6ff" : "#f0fdf4",
              border: `1px solid ${message.role === "user" ? "#bfdbfe" : "#bbf7d0"}`,
              whiteSpace: "pre-wrap",
            }}>
              <ReactMarkdown>{message.content}</ReactMarkdown> {/* Replace plain text with ReactMarkdown */}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontWeight: "600", marginBottom: "0.5rem", color: "#0B57D0" }}>
              Legal Advisor:
            </div>
            <div style={{
              padding: "0.75rem",
              borderRadius: "0.5rem",
              backgroundColor: "#f0fdf4",
              border: "1px solid #bbf7d0",
            }}>
              Typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} style={{
        padding: "1rem",
        borderTop: "1px solid #ddd",
        display: "flex",
        gap: "0.5rem",
      }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your legal question..."
          disabled={isLoading}
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
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          Send
        </button>
        <button
          type="button"
          onClick={clearChat}
          disabled={isLoading}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default LegChatbot;