import React, { useState } from "react";
import MessageList from "./MessageList";
import InputBox from "./InputBox";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, from: "bot", text: "Welcome to your BCI talk(demo)" },
  ]);

  const sendMessage = async (text) => {
    if (!text) return;
    const userMsg = { id: Date.now(), from: "user", text };
    setMessages((m) => [...m, userMsg]);

    try {
      const res = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await res.json();
      const botMsg = {
        id: Date.now() + 1,
        from: "bot",
        text: data.reply || "서버 응답 없음",
      };
      setMessages((m) => [...m, botMsg]);
    } catch (err) {
      const errMsg = {
        id: Date.now() + 2,
        from: "bot",
        text: "서버 연결 실패:" + (err.message || err),
      };
      setMessages((m) => [...m, errMsg]);
    }
  };
  return (
    <div style={{ maxWidth: 800, margin: "24px auto", padding: 16 }}>
      <h2>BCI 챗봇 데모</h2>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 12,
          height: 500,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <MessageList messages={messages} />
        <InputBox onSend={sendMessage} />
      </div>
    </div>
  );
}
