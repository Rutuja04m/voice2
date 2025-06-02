import React, { useState } from "react";
import BotUI from "./components/BotUI";
import { askGemini } from "./utils/api";

function App() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleAsk = async (question) => {
    try {
      setIsSpeaking(true);
      const res = await askGemini(question);
      console.log("Answer:", res.answer);
      // Call your TTS here if needed
    } catch (err) {
      console.error(err);
    } finally {
      setIsSpeaking(false);
    }
  };

  const handleStop = () => {
    // Pause speech
    window.speechSynthesis.pause();
    setIsSpeaking(false);
  };

  const handleResume = () => {
    // Resume speech
    window.speechSynthesis.resume();
    setIsSpeaking(true);
  };

  return (
    <BotUI
      onAsk={handleAsk}
      onStop={handleStop}
      onResume={handleResume}
      isSpeaking={isSpeaking}
    />
  );
}

export default App;
