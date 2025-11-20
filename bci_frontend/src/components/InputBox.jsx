import React, { useState } from "react";

export default function InputBox() {
  const [text, setText] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onsuspend(text.trim());
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", marginTop: 8 }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="메시지를 입력하세요..."
        style={{
          flex: 1,
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ddd",
        }}
      />
      <button
        type="submit"
        style={{ marginLeft: 8, padding: "8px 12px", borderRadius: 8 }}
      >
        전송
      </button>
    </form>
  );
}
