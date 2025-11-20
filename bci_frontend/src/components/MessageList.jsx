import React, { useEffect, useRef } from "react";

export default function MessageList({ messages }) {
  const endRef = useRef();
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "8px 4px" }}>
      {messages.map((m) => (
        <div
          key={m.id}
          style={{
            display: "flex",
            margin: "8px 0",
            justifyContent: m.from === "user" ? "flex-end" : "flex-start",
          }}
        >
          <div
            style={{
              maxWidth: "70%",
              padding: "8px 12px",
              borderRadius: 12,
              background: m.from === "user" ? "#DCF8C6" : "#F1F0F0",
            }}
          >
            <div style={{ fontSize: 14 }}>{m.text}</div>
          </div>
        </div>
      ))}
      <div ref={endRef} />
    </div>
  );
}
