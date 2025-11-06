import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_BASE_URL = "https://gen-ai-chatbot-pw26.onrender.com";

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pdfUploaded, setPdfUploaded] = useState(false);
  const [usePdfContext, setUsePdfContext] = useState(true);
  const [uploadingPdf, setUploadingPdf] = useState(false);

  const chatBoxRef = useRef(null);
  const fileInputRef = useRef(null);
  const lastUserMessageRef = useRef(null);
  const inputRef = useRef(null); // 🔥 NEW: Reference to input field

  // Load chat history from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatHistory");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    const savedPdfStatus = localStorage.getItem("pdfUploaded");
    if (savedPdfStatus === "true") {
      setPdfUploaded(true);
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(messages));
    }
  }, [messages]);

  // 🔥 SMART SCROLL: Only scroll to show last user message + some space for bot reply
  const scrollToRecentMessage = () => {
    if (lastUserMessageRef.current && chatBoxRef.current) {
      const messageElement = lastUserMessageRef.current;
      const chatBox = chatBoxRef.current;

      const messageTop = messageElement.offsetTop;
      const targetScroll = messageTop - 200;

      chatBox.scrollTo({
        top: Math.max(0, targetScroll),
        behavior: "smooth",
      });
    }
  };

  // Trigger smart scroll when loading starts
  useEffect(() => {
    if (loading) {
      setTimeout(scrollToRecentMessage, 100);
    }
  }, [loading]);

  // Send text message
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date().toISOString()
    };

    const userInput = input;
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/chat`, {
        prompt: userInput,
        use_pdf: usePdfContext && pdfUploaded
      });

      const botMessage = {
        sender: "bot",
        text: response.data.response || "No response received",
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "⚠️ Error: " + (error.response?.data?.detail || "Could not connect to server"),
          timestamp: new Date().toISOString()
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  // 🔥 Handle PDF upload with AUTO-SUMMARY
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      alert("Please upload a PDF file");
      return;
    }

    const fileMessage = {
      sender: "user",
      type: "file",
      filename: file.name,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, fileMessage]);
    setUploadingPdf(true);
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API_BASE_URL}/upload_pdf`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPdfUploaded(true);
      localStorage.setItem("pdfUploaded", "true");

      const botMessage = {
        sender: "bot",
        text: res.data.summary,
        timestamp: new Date().toISOString()
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Upload error:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "❌ Upload failed: " + (error.response?.data?.detail || "Please try again"),
          timestamp: new Date().toISOString()
        },
      ]);
    } finally {
      setUploadingPdf(false);
      setLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
    }
  };

  // Clear PDF
  const handleClearPdf = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/clear_pdf`);
      setPdfUploaded(false);
      localStorage.removeItem("pdfUploaded");

      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "🗑️ PDF context cleared. Upload a new PDF to continue.",
          timestamp: new Date().toISOString()
        },
      ]);
    } catch (error) {
      console.error("Clear PDF error:", error);
    }
  };

  // Reset entire conversation
  const handleReset = async () => {
    if (!window.confirm("Are you sure you want to reset the conversation? This will clear all messages and PDF data.")) {
      return;
    }

    try {
      await axios.post(`${API_BASE_URL}/reset`);
      setMessages([]);
      setPdfUploaded(false);
      localStorage.removeItem("chatHistory");
      localStorage.removeItem("pdfUploaded");

      setMessages([
        {
          sender: "bot",
          text: "🔄 Conversation reset. Let's start fresh!",
          timestamp: new Date().toISOString()
        }
      ]);
    } catch (error) {
      console.error("Reset error:", error);
      alert("Failed to reset conversation");
    }
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get last user message index for ref
  const lastUserMessageIndex = [...messages]
    .map((msg, idx) => msg.sender === "user" ? idx : -1)
    .filter(idx => idx !== -1)
    .pop();

  return (
    <div className="chat-container">
      <div className="header">
        <h2>🤖 Gen_AI Chatbot</h2>
        <button className="reset-btn" onClick={handleReset} title="Reset Conversation">
          🔄 Reset
        </button>
      </div>

      {/* PDF Status Bar */}
      {pdfUploaded && (
        <div className="pdf-status-bar">
          <span>📄 PDF Loaded</span>
          <div className="pdf-controls">
            <label className="toggle-label">
              <input
                type="checkbox"
                checked={usePdfContext}
                onChange={(e) => setUsePdfContext(e.target.checked)}
              />
              Use PDF Context
            </label>
            <button className="clear-pdf-btn" onClick={handleClearPdf}>
              🗑️ Clear PDF
            </button>
          </div>
        </div>
      )}

      {/* Chat Window */}
      <div className="chat-box" ref={chatBoxRef}>
        {messages.length === 0 && (
          <div className="welcome-message">
            <h3>👋 Welcome to Gen AI ChatBot!</h3>
            <p>Upload a PDF and ask questions, or just chat with me.</p>
          </div>
        )}

        {messages.map((msg, index) => (
          <div
            key={index}
            ref={index === lastUserMessageIndex ? lastUserMessageRef : null}
            className={`message ${msg.sender === "user" ? "user" : "bot"}`}
          >
            {msg.type === "file" ? (
              <div className="file-indicator">
                📎 <strong>{msg.filename}</strong>
              </div>
            ) : (
              <div className="message-text">{msg.text}</div>
            )}
            <small className="timestamp">
              {msg.timestamp ? formatTime(msg.timestamp) : ""}
            </small>
          </div>
        ))}

        {loading && (
          <div className="loading">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="input-area">
        <button
          className="upload-icon-btn"
          onClick={() => fileInputRef.current.click()}
          title="Upload PDF"
          disabled={uploadingPdf}
        >
          📎
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />

        <input
          ref={inputRef}
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          disabled={loading}
          autoFocus
        />

        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="send-btn"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default App;