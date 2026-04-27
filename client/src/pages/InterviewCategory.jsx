import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle } from "lucide-react";
import { getInterviewQuestions } from "../utils/interviewLoader";
import CompilerPanel from "./CompilerPanel";
import { getUserStats, toggleInterviewSolved } from "../services/api";

export default function InterviewCategoryPage() {
  const { type } = useParams();
  const navigate = useNavigate();

  const questions = getInterviewQuestions(type);

  const [index, setIndex] = useState(0);
  const [completed, setCompleted] = useState({});
  const [time, setTime] = useState(60);

  const q = questions[index];

  // 🔥 TIMER BASED ON DIFFICULTY
  useEffect(() => {
    if (!q) return;

    const map = {
      Beginner: 60,
      Intermediate: 45,
      Advanced: 30,
    };

    setTime(map[q.difficulty] || 60);

    const interval = setInterval(() => {
      setTime((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [index, q]);

  useEffect(() => {
    getUserStats()
      .then((stats) => {
        const solved = stats?.interviewSolved || [];
        const map = {};
        solved.forEach((key) => {
          const [savedType, savedId] = String(key).split(":");
          if (savedType === type && savedId) map[savedId] = true;
        });
        setCompleted(map);
      })
      .catch(() => {});
  }, [type]);

  // 🔥 COMPLETE LOGIC (ONLY TECH + MOCK)
  const markComplete = async () => {
    if (type !== "technical" && type !== "mock") return;
    const previous = completed[q.id];
    const nextValue = !previous;
    setCompleted((prev) => ({ ...prev, [q.id]: nextValue }));
    try {
      await toggleInterviewSolved({
        questionId: q.id,
        solved: nextValue,
        type,
        title: q.title || q.question || "Interview question",
      });
    } catch {
      setCompleted((prev) => ({ ...prev, [q.id]: previous }));
    }
  };

  // 🔥 SPEAKING POPUP (ONLY MOCK)
  const [showTip, setShowTip] = useState(false);

  useEffect(() => {
    if (type === "mock") {
      setShowTip(true);
      setTimeout(() => setShowTip(false), 3000);
    }
  }, [index, type]);

  if (!q) return <p className="p-6 text-white">No questions</p>;

  return (
    <div className="p-6 text-white flex gap-6">

      {/* LEFT SIDE */}
      <div className="flex-1">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-4 text-white/50"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <h2 className="text-xl font-bold mb-2">{q.title}</h2>
        <p className="text-sm text-white/40 mb-4">{q.difficulty}</p>

        {/* TIMER */}
        <div className="mb-4 text-yellow-400">⏱ {time}s</div>

        <p className="mb-4">{q.problem}</p>

        {q.hint && (
          <p className="text-yellow-400 text-sm mb-3">💡 {q.hint}</p>
        )}

        {q.answer && (
          <pre className="bg-black/40 p-3 rounded text-green-400 text-xs">
            {q.answer}
          </pre>
        )}

        {/* COMPLETE BUTTON */}
        {(type === "technical" || type === "mock") && (
          <button
            onClick={markComplete}
            className="mt-4 flex items-center gap-2 text-green-400"
          >
            <CheckCircle size={16} />
            {completed[q.id] ? "Completed ✓" : "Mark Complete"}
          </button>
        )}

        {/* NAV */}
        <div className="flex justify-between mt-6">
          <button onClick={() => setIndex((i) => Math.max(i - 1, 0))}>
            Prev
          </button>

          <button
            onClick={() =>
              setIndex((i) =>
                Math.min(i + 1, questions.length - 1)
              )
            }
          >
            Next
          </button>
        </div>
      </div>

      {/* RIGHT SIDE COMPILER (ONLY TECHNICAL) */}
      {type === "technical" && (
        <div className="w-[400px]">
          <CompilerPanel />
        </div>
      )}

      {/* SPEAKING TIP */}
      {showTip && (
        <div className="fixed bottom-6 right-6 bg-white/10 p-3 rounded">
          Speak louder & confident 💪
        </div>
      )}
    </div>
  );
}