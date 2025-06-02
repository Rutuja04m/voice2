import React, { useState } from "react";

export default function BotUI({ onAsk, onStop, onResume, isSpeaking }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onAsk(input);
      setInput("");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-blue-950 text-white px-4">
      <h1 className="text-3xl mb-6 font-bold">Voice Assistant Bot</h1>

      <div className="w-full max-w-xl bg-[#111827] p-4 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            className="flex-1 p-2 rounded-lg bg-gray-800 text-white"
            placeholder="Ask me something..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Ask
          </button>
        </form>

        <div className="flex gap-4 mt-4 justify-center">
          <button
            onClick={onStop}
            className="bg-yellow-500 hover:bg-yellow-600 px-4 py-1 rounded"
          >
            Stop
          </button>
          <button
            onClick={onResume}
            className="bg-green-500 hover:bg-green-600 px-4 py-1 rounded"
          >
            Resume
          </button>
        </div>

        {isSpeaking && (
          <div className="mt-6 flex justify-center">
            <div className="w-12 h-12 rounded-full bg-red-500 animate-ping" />
          </div>
        )}
      </div>
    </div>
  );
}
