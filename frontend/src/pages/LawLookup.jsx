import React, { useState, useRef, useEffect } from "react";

const sendToVertex = async (message) => {
  try {
    const response = await fetch('http://localhost:5000/api/vertex', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error("Vertex API Error:", error);
    throw error;
  }
};

const LegChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearChat = () => {
    console.log("Clearing chat...");
    setMessages([]);
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    setIsLoading(true);

    try {
      const response = await sendToVertex(userMessage);
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
            ...(isLoading && { opacity: 0.5 }),
          }}
        >
          Send
        </button>
        <button
          type="button"
          disabled={isLoading}
          onClick={clearChat}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#dc2626",
            color: "white",
            border: "none",
            borderRadius: "0.375rem",
            cursor: "pointer",
            ...(isLoading && { opacity: 0.5 }),
          }}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default LegChatbot;