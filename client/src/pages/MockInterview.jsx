import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Timer,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Mic,
  Send,
} from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import { getUserProfile } from "../services/api";
import {
  getTimerByDifficulty,
  calculateScoreDetailed,
} from "../utils/mockEngine";
import { mockQuestions } from "../data/mockQuestions";

const DIFF_COLOR = { easy: "#10B981", medium: "#F59E0B", hard: "#FF6B35" };
const DIFF_BG = {
  easy: "rgba(16,185,129,0.1)",
  medium: "rgba(245,158,11,0.1)",
  hard: "rgba(255,107,53,0.1)",
};
const TYPE_COLOR = "#FF6B35";
const DIFF_ORDER = { easy: 0, medium: 1, hard: 2 };
const sortedMockQuestions = [...mockQuestions].sort(
  (a, b) =>
    (DIFF_ORDER[a.difficulty?.toLowerCase()] ?? 1) -
    (DIFF_ORDER[b.difficulty?.toLowerCase()] ?? 1),
);

// ── Circular Timer ─────────────────────────────────────────
function CircularTimer({ time, maxTime }) {
  const radius = 36;
  const circum = 2 * Math.PI * radius;
  const pct = maxTime > 0 ? time / maxTime : 0;
  const offset = circum * (1 - pct);
  const color = pct > 0.5 ? "#10B981" : pct > 0.25 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 88 88">
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="6"
        />
        <circle
          cx="44"
          cy="44"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circum}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.5s" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold text-white">{time}</span>
        <span className="text-xs text-white/30">sec</span>
      </div>
    </div>
  );
}

// ── Score Ring ─────────────────────────────────────────────
function ScoreRing({ score }) {
  const radius = 50;
  const circum = 2 * Math.PI * radius;
  const offset = circum * (1 - score / 100);
  const color = score >= 70 ? "#10B981" : score >= 40 ? "#F59E0B" : "#EF4444";

  return (
    <div className="relative w-32 h-32 flex items-center justify-center mx-auto">
      <svg className="w-32 h-32 -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="8"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circum}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-bold text-white">{score}</span>
        <span className="text-xs text-white/30">/ 100</span>
      </div>
    </div>
  );
}

// ── Main Mock Interview ────────────────────────────────────
export default function MockInterviewPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Core state (kept from original logic)
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [maxTime, setMaxTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [finished, setFinished] = useState(false);

  // Load user + questions
  useEffect(() => {
    getUserProfile()
      .then(setUser)
      .catch(() => navigate("/login"));

    const ordered = sortedMockQuestions;
    setQuestions(ordered);
    const t = getTimerByDifficulty(ordered[0]?.difficulty);
    setTime(t);
    setMaxTime(t);
  }, [navigate]);

  // Timer countdown
  useEffect(() => {
    if (!isRunning || time <= 0 || feedback[index]) return;
    const id = setInterval(() => setTime((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [isRunning, time, feedback, index]);

  const handleStart = () => setIsRunning(true);

  const handleSubmit = useCallback(() => {
    const currentQ = questions[index];
    const result = calculateScoreDetailed(
      currentAnswer,
      currentQ.expectedPoints,
    );

    setFeedback((prev) => [...prev, result]);
    setAnswers((prev) => [...prev, currentAnswer]);
    setIsRunning(false);
  }, [questions, index, currentAnswer]);

  // Auto-submit when timer hits 0
  useEffect(() => {
    if (isRunning && time === 0 && !feedback[index]) {
      handleSubmit();
    }
  }, [time, isRunning, feedback, index, handleSubmit]);

  const handleNext = () => {
    const next = index + 1;
    if (next >= questions.length) {
      setFinished(true);
      return;
    }
    setIndex(next);
    setCurrentAnswer("");
    const t = getTimerByDifficulty(questions[next].difficulty);
    setTime(t);
    setMaxTime(t);
    setIsRunning(false);
  };

  const handleRestart = () => {
    const ordered = sortedMockQuestions;
    setQuestions(ordered);
    setIndex(0);
    setAnswers([]);
    setFeedback([]);
    setCurrentAnswer("");
    setFinished(false);
    setIsRunning(false);
    const t = getTimerByDifficulty(ordered[0]?.difficulty);
    setTime(t);
    setMaxTime(t);
  };

  const handlePrev = () => {
    if (index === 0) return;

    const prev = index - 1;
    setIndex(prev);
    setCurrentAnswer(answers[prev] || "");
    setIsRunning(false);

    const t = getTimerByDifficulty(questions[prev].difficulty);
    setTime(t);
    setMaxTime(t);
  };

  const goToQuestion = useCallback(
    (targetIndex) => {
      const safeIndex = Math.max(0, Math.min(targetIndex, questions.length - 1));
      setIndex(safeIndex);
      setCurrentAnswer(answers[safeIndex] || "");
      setIsRunning(false);
      const t = getTimerByDifficulty(questions[safeIndex]?.difficulty);
      setTime(t);
      setMaxTime(t);
    },
    [answers, questions],
  );

  if (!questions.length) {
    return (
      <div
        className="flex h-screen items-center justify-center"
        style={{ background: "#0F0F1A" }}
      >
        <div className="text-center">
          <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/60 animate-spin mx-auto mb-3" />
          <p className="text-white/40 text-sm">Loading questions...</p>
        </div>
      </div>
    );
  }

  const currentQ = questions[index];
  const diff = currentQ?.difficulty?.toLowerCase() || "medium";
  const diffColor = DIFF_COLOR[diff] || "#F59E0B";
  const diffBg = DIFF_BG[diff] || "rgba(245,158,11,0.1)";
  const currentFb = feedback[index];
  const avgScore = feedback.length
    ? Math.round(feedback.reduce((s, f) => s + f.score, 0) / feedback.length)
    : 0;

  const currentPage = index + 1;
  const totalPages = questions.length;
  const pagination = (() => {
    const items = [];
    const maxButtons = 7;
    let start = Math.max(1, currentPage - 3);
    let end = Math.min(totalPages, start + maxButtons - 1);
    start = Math.max(1, end - maxButtons + 1);

    for (let n = start; n <= end; n += 1) {
      items.push(n);
    }

    return { items, start, end };
  })();

  // ── Finished screen ─────────────────────────────────────
  if (finished) {
    return (
      <div
        className="min-h-screen font-['Inter'] flex flex-col"
        style={{
          background:
            "radial-gradient(ellipse at 20% 0%, #1a0a14 0%, #0F0F1A 45%, #080d1a 100%)",
        }}
      >
        <div
          className="fixed top-0 left-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{
            background: "rgba(255,107,53,0.07)",
            filter: "blur(100px)",
            zIndex: 0,
          }}
        />

        <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
          <DashboardNavbar user={user} />
          <div className="flex flex-1 overflow-hidden">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6">
              <div className="max-w-2xl mx-auto">
                {/* Result Card */}
                <div
                  className="rounded-[18px] border p-8 mb-6"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,107,53,0.08), rgba(108,62,244,0.04))",
                    borderColor: "rgba(255,255,255,0.10)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-white mb-1">
                      Interview Complete!
                    </h2>
                    <p className="text-sm text-white/40">
                      Here's how you performed
                    </p>
                  </div>

                  {/* Score ring */}
                  <ScoreRing score={avgScore} />
                  <p className="text-center text-sm text-white/40 mt-3 mb-8">
                    Average Score across {questions.length} questions
                  </p>

                  {/* Per-question breakdown */}
                  <div className="space-y-3">
                    {questions.map((q, i) => {
                      const fb = feedback[i];
                      const sc = fb?.score ?? 0;
                      const col =
                        sc >= 70 ? "#10B981" : sc >= 40 ? "#F59E0B" : "#EF4444";
                      return (
                        <div
                          key={q.id}
                          className="rounded-[12px] border p-4"
                          style={{
                            background: "rgba(255,255,255,0.03)",
                            borderColor: "rgba(255,255,255,0.07)",
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className="w-9 h-9 rounded-[8px] flex items-center justify-center text-sm font-bold flex-shrink-0"
                              style={{ background: `${col}15`, color: col }}
                            >
                              {sc}%
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-semibold text-white/80 leading-relaxed mb-2">
                                {q.question}
                              </p>
                              {fb && (
                                <div className="flex flex-wrap gap-2 text-xs">
                                  {fb.matched?.length > 0 && (
                                    <span style={{ color: "#10B981" }}>
                                      ✓ {fb.matched.length} covered
                                    </span>
                                  )}
                                  {fb.missing?.length > 0 && (
                                    <span style={{ color: "#EF4444" }}>
                                      ✗ {fb.missing.length} missing
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={handleRestart}
                      className="flex-1 flex items-center justify-center gap-2 rounded-[10px] border py-3 text-sm font-medium transition-all hover:bg-white/5"
                      style={{
                        borderColor: "rgba(255,255,255,0.10)",
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      <RotateCcw size={14} /> Try Again
                    </button>
                    <button
                      onClick={() => navigate("/interview")}
                      className="flex-1 flex items-center justify-center gap-2 rounded-[10px] py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #6C3EF4, #3B8BFF)",
                      }}
                    >
                      Back to Interview <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }

  // ── Question screen ────────────────────────────────────
  return (
    <div
      className="min-h-screen font-['Inter'] flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, #1a0a14 0%, #0F0F1A 45%, #080d1a 100%)",
      }}
    >
      {/* Glow blobs */}
      <div
        className="fixed top-0 right-1/3 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "rgba(255,107,53,0.07)",
          filter: "blur(100px)",
          zIndex: 0,
        }}
      />
      <div
        className="fixed bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "rgba(108,62,244,0.05)",
          filter: "blur(80px)",
          zIndex: 0,
        }}
      />

      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
        <DashboardNavbar user={user} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto">
            {/* ── Secondary Nav ── */}
            <div
              className="shrink-0 px-6 py-3 border-b flex items-center gap-3"
              style={{
                borderColor: "rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.01)",
              }}
            >
              <button
                onClick={() => navigate("/interview")}
                className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-[10px] border transition-all hover:bg-white/5"
                style={{
                  borderColor: "rgba(255,255,255,0.10)",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                <ArrowLeft size={14} /> Back
              </button>

              <div className="w-px h-5 bg-white/10" />

              <span
                className="text-xs px-2.5 py-1 rounded-full font-semibold"
                style={{ background: `${TYPE_COLOR}15`, color: TYPE_COLOR }}
              >
                Mock Interview
              </span>

              <div className="flex-1" />

              {/* Progress dots */}
              <div className="flex items-center gap-1.5">
                {questions.map((_, i) => (
                  <div
                    key={i}
                    className="h-1.5 rounded-full transition-all"
                    style={{
                      width: i === index ? "20px" : "8px",
                      background:
                        i < index
                          ? "#10B981"
                          : i === index
                            ? TYPE_COLOR
                            : "rgba(255,255,255,0.12)",
                    }}
                  />
                ))}
              </div>

              <span className="text-xs text-white/30">
                {index + 1}/{questions.length}
              </span>
            </div>

            {/* ── Content ── */}
            <div className="max-w-3xl mx-auto px-6 py-6 space-y-5">
              {/* ── Question Card ── */}
              <div
                className="rounded-[16px] border overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,107,53,0.06), rgba(108,62,244,0.04))",
                  borderColor: "rgba(255,255,255,0.10)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                  backdropFilter: "blur(12px)",
                }}
              >
                {/* Card header: timer + meta */}
                <div className="flex items-center justify-between px-6 pt-5 pb-4">
                  <div className="flex items-center gap-3">
                    {/* Difficulty */}
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-semibold capitalize"
                      style={{ background: diffBg, color: diffColor }}
                    >
                      {currentQ.difficulty}
                    </span>
                    {currentQ.type && (
                      <span className="text-xs text-white/35 capitalize">
                        {currentQ.type}
                      </span>
                    )}
                  </div>

                  {/* Circular timer */}
                  <CircularTimer time={time} maxTime={maxTime} />
                </div>

                {/* Question text */}
                <div className="px-6 pb-6">
                  <h2 className="text-xl font-bold text-white leading-relaxed">
                    {currentQ.question}
                  </h2>
                </div>

                {/* Bottom progress bar */}
                <div className="h-1 bg-white/[0.04]">
                  <div
                    className="h-full transition-all duration-700"
                    style={{
                      width: `${((index + 1) / questions.length) * 100}%`,
                      backgroundImage: `linear-gradient(90deg, ${TYPE_COLOR}90, ${TYPE_COLOR})`,
                    }}
                  />
                </div>
              </div>

              {/* ── Feedback View (after submit) ── */}
              {currentFb ? (
                <div
                  className="rounded-[16px] border overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  {/* Score header */}
                  <div
                    className="px-6 py-4 flex items-center gap-4 border-b border-white/[0.06]"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-4"
                      style={{
                        borderColor:
                          currentFb.score >= 70
                            ? "#10B981"
                            : currentFb.score >= 40
                              ? "#F59E0B"
                              : "#EF4444",
                        color:
                          currentFb.score >= 70
                            ? "#10B981"
                            : currentFb.score >= 40
                              ? "#F59E0B"
                              : "#EF4444",
                        background:
                          currentFb.score >= 70
                            ? "rgba(16,185,129,0.1)"
                            : currentFb.score >= 40
                              ? "rgba(245,158,11,0.1)"
                              : "rgba(239,68,68,0.1)",
                      }}
                    >
                      {currentFb.score}%
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">
                        Feedback
                      </h3>
                      <p className="text-sm text-white/50">
                        {currentFb.feedback}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-0 divide-x divide-white/[0.06]">
                    {/* Covered points */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 size={14} style={{ color: "#10B981" }} />
                        <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                          Covered ({currentFb.matched?.length || 0})
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {(currentFb.matched || []).map((m, i) => (
                          <li
                            key={i}
                            className="text-xs text-white/60 flex gap-2"
                          >
                            <span style={{ color: "#10B981" }}>✓</span> {m}
                          </li>
                        ))}
                        {(!currentFb.matched ||
                          currentFb.matched.length === 0) && (
                          <p className="text-xs text-white/25">None covered</p>
                        )}
                      </ul>
                    </div>

                    {/* Missing points */}
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <XCircle size={14} style={{ color: "#EF4444" }} />
                        <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">
                          Missing ({currentFb.missing?.length || 0})
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {(currentFb.missing || []).map((m, i) => (
                          <li
                            key={i}
                            className="text-xs text-white/60 flex gap-2"
                          >
                            <span style={{ color: "#EF4444" }}>✗</span> {m}
                          </li>
                        ))}
                        {(!currentFb.missing ||
                          currentFb.missing.length === 0) && (
                          <p className="text-xs text-white/25">
                            Nothing missing 🎉
                          </p>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Sample answer */}
                  {currentQ.sampleAnswer && (
                    <div className="px-5 pb-5 border-t border-white/[0.06] pt-4">
                      <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                        Sample Answer
                      </p>
                      <p className="text-sm text-white/55 leading-relaxed whitespace-pre-wrap">
                        {currentQ.sampleAnswer}
                      </p>
                    </div>
                  )}

                  {/* Next button */}
                  <div className="flex gap-3">
                    {/* PREV */}
                    <button
                      onClick={handlePrev}
                      disabled={index === 0}
                      className="flex-1 flex items-center justify-center gap-2 rounded-[10px] py-3 text-sm font-medium transition-all disabled:opacity-25"
                      style={{
                        border: "1px solid rgba(255,255,255,0.10)",
                        color: "rgba(255,255,255,0.65)",
                      }}
                    >
                      ← Prev
                    </button>

                    {/* NEXT */}
                    <button
                      onClick={handleNext}
                      className="flex-1 flex items-center justify-center gap-2 rounded-[10px] py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #6C3EF4, #3B8BFF)",
                      }}
                    >
                      {index + 1 >= questions.length ? "See Results" : "Next"}
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                /* ── Answer Input View ── */
                <div
                  className="rounded-[16px] border overflow-hidden"
                  style={{
                    background: "rgba(255,255,255,0.025)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                >
                  <div
                    className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <span className="text-xs text-white/40 font-medium">
                      Your Answer
                    </span>
                    {!isRunning && (
                      <button
                        onClick={handleStart}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[8px] font-semibold text-white transition-all hover:opacity-90"
                        style={{
                          background: "rgba(16,185,129,0.15)",
                          color: "#10B981",
                          border: "1px solid rgba(16,185,129,0.3)",
                        }}
                      >
                        <Timer size={12} /> Start Timer
                      </button>
                    )}
                  </div>

                  <div className="p-5">
                    <textarea
                      value={currentAnswer}
                      onChange={(e) => setCurrentAnswer(e.target.value)}
                      placeholder="Type your answer here... Be detailed and cover key concepts."
                      className="w-full h-40 bg-transparent resize-none outline-none text-sm leading-relaxed text-white/80 placeholder-white/20"
                    />
                  </div>

                  {/* Action row */}
                  <div className="flex items-center gap-3 px-5 pb-5 pt-2 border-t border-white/[0.06]">
                    <button
                      className="w-9 h-9 rounded-[8px] flex items-center justify-center border transition-all hover:bg-white/5"
                      style={{
                        borderColor: "rgba(255,255,255,0.10)",
                        color: "rgba(255,255,255,0.4)",
                      }}
                      title="Voice input (coming soon)"
                    >
                      <Mic size={15} />
                    </button>

                    <div className="flex-1 text-xs text-white/30">
                      {currentAnswer.length > 0
                        ? `${currentAnswer.split(" ").filter(Boolean).length} words`
                        : "Speak your answer or type it"}
                    </div>

                    <button
                      onClick={handleSubmit}
                      disabled={!isRunning && !currentAnswer.trim()}
                      className="flex items-center gap-2 px-4 py-2 rounded-[10px] text-sm font-semibold text-white transition-all hover:opacity-90 disabled:opacity-30"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, #FF6B35, #E55A20)",
                      }}
                    >
                      <Send size={13} /> Submit
                    </button>
                  </div>
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
                  {pagination.start > 1 && (
                    <>
                      <button
                        onClick={() => goToQuestion(0)}
                        className="w-8 h-8 rounded-[10px] text-xs font-medium transition-all"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        1
                      </button>
                      <span className="text-xs text-white/30">…</span>
                    </>
                  )}

                  {pagination.items.map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => goToQuestion(pageNum - 1)}
                      className="w-8 h-8 rounded-[10px] text-xs font-medium transition-all"
                      style={{
                        background:
                          currentPage === pageNum
                            ? "rgba(255,107,53,0.25)"
                            : "rgba(255,255,255,0.04)",
                        color:
                          currentPage === pageNum
                            ? "white"
                            : "rgba(255,255,255,0.55)",
                      }}
                    >
                      {pageNum}
                    </button>
                  ))}

                  {pagination.end < totalPages && (
                    <>
                      <span className="text-xs text-white/30">…</span>
                      <button
                        onClick={() => goToQuestion(totalPages - 1)}
                        className="w-8 h-8 rounded-[10px] text-xs font-medium transition-all"
                        style={{
                          background: "rgba(255,255,255,0.04)",
                          color: "rgba(255,255,255,0.55)",
                        }}
                      >
                        {totalPages}
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* Expected points hint (before submit) */}
              {!currentFb && currentQ.expectedPoints && (
                <div
                  className="rounded-[12px] border p-4"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  <p className="text-xs font-semibold text-white/35 uppercase tracking-wider mb-2">
                    💡 Key points to cover
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {currentQ.expectedPoints.map((pt, i) => (
                      <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.05)",
                          color: "rgba(255,255,255,0.45)",
                        }}
                      >
                        {pt}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
