import React, { useState } from "react";

function Chatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Xin chào 👋! Tôi là Chatbot GPT, bạn cần gì?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "system", content: "You are a helpful assistant." }, 
                     { role: "user", content: input }],
        }),
      });

      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "Xin lỗi, tôi chưa hiểu 😅";

      setMessages([...newMessages, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error("Lỗi khi gọi OpenAI:", err);
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Không kết nối được OpenAI API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "300px",
        height: "400px",
        background: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        fontFamily: "sans-serif",
        zIndex: 99999,
      }}
    >
      <div
        style={{
          background: "#2563eb",
          color: "white",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Chatbot
      </div>

      <div
        style={{
          flex: 1,
          padding: "10px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              textAlign: msg.sender === "user" ? "right" : "left",
              margin: "8px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: "12px",
                background:
                  msg.sender === "user" ? "#93c5fd" : "rgba(0,0,0,0.1)",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}

        {loading && <p style={{ fontStyle: "italic" }}>Đang gõ...</p>}
      </div>

      <div style={{ display: "flex", padding: "10px", borderTop: "1px solid #eee" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Nhập tin nhắn..."
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            marginRight: "6px",
          }}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Gửi
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
