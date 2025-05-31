import React from "react";

export default function ChatBox({ messages }) {
  return (
    <div className="chatbox p-4 h-[400px] overflow-y-auto border rounded-md bg-white dark:bg-gray-800">
      {messages.length === 0 && <p className="text-gray-500">Say something to start the conversation...</p>}
      {messages.map(({ id, sender, text }) => (
        <div
          key={id}
          className={`my-2 p-2 rounded ${sender === "user" ? "bg-blue-100 text-right" : "bg-gray-200 text-left"}`}
        >
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
