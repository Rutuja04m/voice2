import React from "react";

export default function Controls({ onAsk, onStop, onResume, isListening, isSpeaking, loading }) {
  return (
    <div className="flex gap-3 justify-center mt-4">
      <button
        disabled={loading}
        onClick={onAsk}
        className="btn-primary"
      >
        {isListening ? "Listening..." : "Ask"}
      </button>
      <button
        disabled={!isSpeaking}
        onClick={onStop}
        className="btn-secondary"
      >
        Stop
      </button>
      <button
        disabled={isSpeaking}
        onClick={onResume}
        className="btn-secondary"
      >
        Resume
      </button>
    </div>
  );
}
