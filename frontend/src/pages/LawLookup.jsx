import React, { useState, useRef, useEffect } from "react";
import axios from "axios"; // Ensure axios is installed
import ReactMarkdown from "react-markdown";

const sendToVertex = async (message) => {
  try {
    const response = await axios.post("http://localhost:5000/api/vertex", {
      message,
    });
    return response.data.content; // Extract the text from the backend response
  } catch (error) {
    console.error("Vertex API Error:", error.message);
    throw new Error("Failed to get response from Vertex AI");
  }
};

const LegChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearChat = async () => {
    setIsLoading(true);
    try {
      setMessages([]);
      setError(null);
      console.log("Chat cleared successfully");
    } catch (error) {
      console.error("Error clearing chat:", error.message);
      setError("Failed to clear chat");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    setInputMessage("");
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await sendToVertex(userMessage.content);
      const assistantMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Send message error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Error: Could not get a response. Please try again.",
          timestamp: new Date().toISOString(),
        },
      ]);
      setError("Failed to get response from legal advisor");
    }
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
        Legal Lookup
      </div>

      {error && (
        <div style={{ padding: "1rem", color: "red", textAlign: "center" }}>
          {error}
        </div>
      )}

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
                color: message.role === "user" ? "#2563eb" : "#0a0a0a",
              }}
            >
              {message.role === "user" ? "Your Query:" : "Legal Advisor:"}
            </div>
            <div
              style={{
                padding: "0.75rem",
                borderRadius: "0.5rem",
                backgroundColor: message.role === "user" ? "#eff6ff" : "#ffffff",
                border: `1px solid ${
                  message.role === "user" ? "#bfdbfe" : "#ddd"
                }`,
                whiteSpace: "pre-wrap",
              }}
            >
              <ReactMarkdown>{message.content}</ReactMarkdown>
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
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
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