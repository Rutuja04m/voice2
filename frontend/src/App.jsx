import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import ChatBox from "./components/ChatBox";
import Controls from "./components/Controls";
import Sidebar from "./components/Sidebar";

import { askGemini, uploadDocument } from "./utils/api";
import { useSpeechRecognition, speakText, stopSpeaking } from "./voice";

export default function App() {
  const [messages, setMessages] = React.useState([]);
  const [isListening, setIsListening] = React.useState(false);
  const [isSpeaking, setIsSpeaking] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [question, setQuestion] = React.useState("");

  const { start, stop } = useSpeechRecognition(
          (transcript) => {
       setQuestion(transcript);
       setIsListening(false);
       handleAsk(transcript);
     },
        (error) => {
       toast.error(`Speech recognition error: ${error}`);
       setIsListening(false);
     }
     );

  async function handleAsk(q = question) {
    if (!q.trim()) return;

    setMessages((msgs) => [...msgs, { id: Date.now(), sender: "user", text: q }]);
    setLoading(true);

    try {
      const res = await askGemini(q);
      const reply = res.answer || "No answer from Gemini.";

      setMessages((msgs) => [...msgs, { id: Date.now() + 1, sender: "bot", text: reply }]);

      setIsSpeaking(true);
      speakText(reply, () => setIsSpeaking(false));
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  }

  function handleStartListening() {
    setIsListening(true);
    start();
  }

  function handleStopSpeaking() {
    stopSpeaking();
    setIsSpeaking(false);
  }

  function handleResumeSpeaking() {
    if (messages.length === 0) return;
    const lastBotMsg = [...messages].reverse().find((m) => m.sender === "bot");
    if (!lastBotMsg) return;

    setIsSpeaking(true);
    speakText(lastBotMsg.text, () => setIsSpeaking(false));
  }

  async function handleUpload(file) {
    try {
      await uploadDocument(file);
      toast.success("Document uploaded successfully");
    } catch (e) {
      toast.error(`Upload failed: ${e.message}`);
    }
  }

  return (
    <Router>
      <Toaster position="top-right" />
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <Sidebar onUpload={handleUpload} />
        <main className="flex-1 flex flex-col p-4">
          <ChatBox messages={messages} />
          <Controls
            onAsk={handleStartListening}
            onStop={handleStopSpeaking}
            onResume={handleResumeSpeaking}
            isListening={isListening}
            isSpeaking={isSpeaking}
            loading={loading}
          />
        </main>
      </div>

      <Routes>
        <Route path="/" element={<Navigate to="/chat" />} />
        <Route
          path="/chat"
          element={
            <main className="flex-1 flex flex-col p-4">
              <ChatBox messages={messages} />
              <Controls
                onAsk={handleStartListening}
                onStop={handleStopSpeaking}
                onResume={handleResumeSpeaking}
                isListening={isListening}
                isSpeaking={isSpeaking}
                loading={loading}
              />
            </main>
          }
        />
        <Route
          path="/admin"
          element={<Sidebar onUpload={handleUpload} />}
        />
      </Routes>
    </Router>
  );
}
