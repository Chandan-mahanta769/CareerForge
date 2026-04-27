import { useRef } from "react";
import { startVoiceRecognition, stopVoiceRecognition } from "../utils/useVoice";

export default function MockControls({
  isRunning,
  setIsRunning,
  currentAnswer,
  setCurrentAnswer,
  onNext
}) {
  const recognitionRef = useRef(null);
  const isRecording = useRef(false);

  const handleStartVoice = () => {
    if (isRecording.current) return;

    recognitionRef.current = startVoiceRecognition(setCurrentAnswer);
    isRecording.current = true;
  };

  const handleStopVoice = () => {
    stopVoiceRecognition(recognitionRef.current);
    isRecording.current = false;
  };

  return (
    <div className="glass p-6 rounded-xl">

      <textarea
        value={currentAnswer}
        onChange={(e) => setCurrentAnswer(e.target.value)}
        placeholder="Speak or type your answer..."
        className="w-full h-32 p-3 bg-black/40 rounded"
      />

      <div className="flex gap-4 mt-4 flex-wrap">

        {/* TIMER CONTROL */}
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 bg-blue-500 rounded"
        >
          {isRunning ? "Pause" : "Start"}
        </button>

        {/* 🎤 START */}
        <button
          onClick={handleStartVoice}
          className="px-4 py-2 bg-purple-500 rounded"
        >
          🎤 Start Speaking
        </button>

        {/* ⛔ STOP */}
        <button
          onClick={handleStopVoice}
          className="px-4 py-2 bg-red-500 rounded"
        >
          Stop
        </button>

        {/* NEXT */}
        <button
          onClick={onNext}
          className="px-4 py-2 bg-green-500 rounded"
        >
          Next
        </button>

      </div>
    </div>
  );
}