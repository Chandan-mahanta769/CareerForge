import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ChevronDown, Copy, Check, Code2, X } from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import CompilerPanel from "./CompilerPanel";
import { getUserProfile } from "../services/api";
import { technicalQuestions } from "../data/technicalQuestions";

const PER_PAGE   = 5;
const TYPE_COLOR = "#3B8BFF";
const LS_KEY     = "cf_interview_bookmarks_technical";

// ── Category → compiler language map ──────────────────────
const LANG_MAP = {
  JavaScript:  "javascript",
  "JS":        "javascript",
  React:       "jsx",
  CSS:         "css",
  HTML:        "html",
  Node:        "javascript",
  NodeJS:      "javascript",
  Express:     "javascript",
  MongoDB:     "javascript",
  TypeScript:  "typescript",
  Python:      "python",
  DSA:         "javascript",
  "System Design": "javascript",
};

const getLang = (category = "") =>
  LANG_MAP[category] || LANG_MAP[Object.keys(LANG_MAP).find(k => category.toLowerCase().includes(k.toLowerCase())) || ""] || "javascript";

// ── Difficulty badge ───────────────────────────────────────
const DIFF_COLOR = {
  Beginner:     "#10B981",
  Intermediate: "#F59E0B",
  Advanced:     "#FF6B35",
  Easy:         "#10B981",
  Medium:       "#F59E0B",
  Hard:         "#FF6B35",
};

// ── Single Question Card ───────────────────────────────────
function TechCard({ question, globalIndex, isBookmarked, onBookmark, onOpenCompiler }) {
  const [showAnswer,   setShowAnswer]   = useState(false);
  const [showFollowUp, setShowFollowUp] = useState(false);
  const [copied,       setCopied]       = useState(false);

  const diffColor = DIFF_COLOR[question.difficulty] || TYPE_COLOR;

  const copyAnswer = () => {
    navigator.clipboard.writeText(question.answer || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="rounded-[16px] border overflow-hidden transition-all duration-300"
      style={{
        background: "rgba(255,255,255,0.025)",
        borderColor: "rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* ── Question Row ── */}
      <div className="flex items-start gap-4 p-5">
        <div
          className="w-8 h-8 rounded-[8px] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
          style={{ background: `${TYPE_COLOR}18`, color: TYPE_COLOR }}
        >
          {globalIndex + 1}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-white leading-relaxed mb-3">
            {question.question}
          </p>

          {/* Badges row */}
          <div className="flex flex-wrap gap-2">
            {question.category && (
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: `${TYPE_COLOR}12`,
                  color: TYPE_COLOR,
                  border: `1px solid ${TYPE_COLOR}25`,
                }}
              >
                {question.category}
              </span>
            )}
            {question.difficulty && (
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-medium"
                style={{
                  background: `${diffColor}12`,
                  color: diffColor,
                  border: `1px solid ${diffColor}25`,
                }}
              >
                {question.difficulty}
              </span>
            )}

            {/* Try in Compiler button */}
            <button
              onClick={() => onOpenCompiler(question.category)}
              className="flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full font-medium transition-all hover:opacity-80"
              style={{
                backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)",
                color: "white",
              }}
            >
              <Code2 size={10} />
              Try in Compiler
            </button>
          </div>

          {/* Hint */}
          {question.hint && (
            <div
              className="mt-3 px-3 py-2 rounded-[8px] flex items-start gap-2"
              style={{
                background: "rgba(245,158,11,0.07)",
                borderLeft: "2px solid rgba(245,158,11,0.4)",
              }}
            >
              <span className="text-xs" style={{ color: "#F59E0B" }}>💡</span>
              <p className="text-xs leading-relaxed" style={{ color: "rgba(245,158,11,0.85)" }}>
                {question.hint}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={() => onBookmark(question.id)}
          className="w-8 h-8 rounded-[8px] flex items-center justify-center hover:bg-white/5 transition flex-shrink-0"
        >
          <Star
            size={14}
            className={isBookmarked ? "fill-yellow-400" : ""}
            style={{ color: isBookmarked ? "#FBBF24" : "rgba(255,255,255,0.25)" }}
          />
        </button>
      </div>

      {/* ── Answer ── FIRST & HIDDEN ── */}
      <div className="border-t border-white/[0.06]">
        <button
          onClick={() => setShowAnswer(o => !o)}
          className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-all"
          style={{ color: showAnswer ? TYPE_COLOR : "rgba(255,255,255,0.45)" }}
        >
          <span className="text-sm font-medium flex items-center gap-2">
            ✨ Answer
          </span>
          <ChevronDown
            size={14}
            style={{
              transform: showAnswer ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          />
        </button>

        {showAnswer && (
          <div className="px-5 pb-5">
            <div
              className="rounded-[10px] border overflow-hidden"
              style={{ background: `${TYPE_COLOR}06`, borderColor: `${TYPE_COLOR}25` }}
            >
              <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.05]">
                <span className="text-xs font-mono text-white/30">answer</span>
                <button
                  onClick={copyAnswer}
                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-all"
                  style={{
                    background: copied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
                    color: copied ? "#10B981" : "rgba(255,255,255,0.4)",
                  }}
                >
                  {copied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                </button>
              </div>
              <pre
                className="p-4 text-xs leading-relaxed overflow-auto font-mono"
                style={{ color: "#7DD3B0", background: "rgba(0,0,0,0.15)" }}
              >
                {question.answer}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* ── Follow-up Questions ── SECOND ── */}
      {question.followUp && question.followUp.length > 0 && (
        <div className="border-t border-white/[0.06]">
          <button
            onClick={() => setShowFollowUp(o => !o)}
            className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-all"
            style={{ color: showFollowUp ? "#F59E0B" : "rgba(255,255,255,0.45)" }}
          >
            <span className="text-sm font-medium flex items-center gap-2">
              🎯 Follow-up Questions
              <span
                className="text-xs px-1.5 py-0.5 rounded-md"
                style={{ background: "rgba(245,158,11,0.12)", color: "#F59E0B" }}
              >
                {question.followUp.length}
              </span>
            </span>
            <ChevronDown
              size={14}
              style={{
                transform: showFollowUp ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
              }}
            />
          </button>

          {showFollowUp && (
            <div className="px-5 pb-5">
              <div
                className="rounded-[10px] divide-y overflow-hidden"
                style={{
                  background: "rgba(245,158,11,0.04)",
                  border: "1px solid rgba(245,158,11,0.15)",
                  divideColor: "rgba(255,255,255,0.05)",
                }}
              >
                {question.followUp.map((fq, idx) => (
                  <div key={idx} className="p-4">
                    <p className="text-xs font-semibold text-white/70 mb-1.5">
                      <span style={{ color: "#F59E0B" }}>Q{idx + 1}. </span>
                      {typeof fq === "object" ? fq.question : fq}
                    </p>
                    {typeof fq === "object" && fq.answer && (
                      <p className="text-xs text-white/45 leading-relaxed pl-4 border-l border-white/10">
                        {fq.answer}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────
export default function TechnicalInterviewPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [showCompiler, setShowCompiler] = useState(false);
  const [compilerLang, setCompilerLang] = useState("javascript");
  const [compilerCategory, setCompilerCategory] = useState("JavaScript");

  const [bookmarks, setBookmarks] = useState(() => {
    try { return JSON.parse(localStorage.getItem(LS_KEY)) ?? []; }
    catch { return []; }
  });

  useEffect(() => {
    getUserProfile().then(setUser).catch(() => navigate("/login"));
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(bookmarks));
  }, [bookmarks]);

  const totalPages = Math.ceil(technicalQuestions.length / PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return technicalQuestions.slice(start, start + PER_PAGE);
  }, [page]);

  const handleBookmark = (id) =>
    setBookmarks(prev =>
      prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
    );

  const handleOpenCompiler = (category = "JavaScript") => {
    setCompilerCategory(category);
    setCompilerLang(getLang(category));
    setShowCompiler(true);
  };

  const goToPage = (n) => { setPage(n); window.scrollTo(0, 0); };

  return (
    <div
      className="min-h-screen font-['Inter'] flex flex-col"
      style={{
        background:
          "radial-gradient(ellipse at 20% 0%, #0a1628 0%, #0F0F1A 45%, #080d1a 100%)",
      }}
    >
      {/* Glow blobs */}
      <div
        className="fixed top-0 right-1/4 w-[450px] h-[450px] rounded-full pointer-events-none"
        style={{ background: "rgba(59,139,255,0.07)", filter: "blur(100px)", zIndex: 0 }}
      />
      <div
        className="fixed bottom-1/3 left-1/4 w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{ background: "rgba(108,62,244,0.05)", filter: "blur(80px)", zIndex: 0 }}
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
                style={{ borderColor: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)" }}
              >
                <ArrowLeft size={14} /> Back
              </button>

              <div className="w-px h-5 bg-white/10" />

              <div className="flex items-center gap-2">
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-semibold"
                  style={{ background: `${TYPE_COLOR}15`, color: TYPE_COLOR }}
                >
                  Technical Interview
                </span>
                <span className="text-xs text-white/35">
                  {technicalQuestions.length} questions
                </span>
              </div>

              <div className="flex-1" />

              {/* ── Compiler button top-right ── */}
              <button
                onClick={() => handleOpenCompiler(compilerCategory)}
                className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-[10px] font-semibold text-white transition-all hover:opacity-90"
                style={{ backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)" }}
              >
                <Code2 size={13} />
                Compiler
                {compilerLang !== "javascript" && (
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-md ml-1"
                    style={{ background: "rgba(255,255,255,0.15)", color: "white" }}
                  >
                    {compilerCategory}
                  </span>
                )}
              </button>

              <span className="text-xs text-white/30">Page {page}/{totalPages}</span>
            </div>

            {/* ── Question List ── */}
            <div className="max-w-3xl mx-auto px-6 py-6">
              <div className="flex flex-col gap-4">
                {paginated.map((q, i) => (
                  <TechCard
                    key={q.id}
                    question={q}
                    globalIndex={(page - 1) * PER_PAGE + i}
                    isBookmarked={bookmarks.includes(q.id)}
                    onBookmark={handleBookmark}
                    onOpenCompiler={handleOpenCompiler}
                  />
                ))}
              </div>

              {/* ── Pagination ── */}
              {totalPages > 1 && (
  <div
    className="flex items-center justify-between mt-8 pt-6 border-t"
    style={{ borderColor: "rgba(255,255,255,0.06)" }}
  >
    <button
      disabled={page === 1}
      onClick={() => goToPage(page - 1)}
      className="px-4 py-2 rounded-[10px] text-sm font-medium transition-all disabled:opacity-25"
      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}
    >
      ← Prev
    </button>

    <div className="flex items-center gap-1.5">

      {/* LEFT DOTS */}
      {page > 2 && (
        <span className="text-white/30 px-1">...</span>
      )}

      {/* PAGE NUMBERS */}
      {(
        totalPages <= 5
          ? Array.from({ length: totalPages }, (_, i) => i + 1)
          : page === 1 || page === 2
          ? [1, 2, 3, 4, 5]
          : page === totalPages || page === totalPages - 1
          ? [
              totalPages - 4,
              totalPages - 3,
              totalPages - 2,
              totalPages - 1,
              totalPages,
            ]
          : [page - 2, page - 1, page, page + 1, page + 2]
      ).map(n => (
        <button
          key={n}
          onClick={() => goToPage(n)}
          className="w-7 h-7 rounded-[8px] text-xs font-medium transition-all"
          style={{
            background: page === n ? `${TYPE_COLOR}30` : "rgba(255,255,255,0.04)",
            color: page === n ? "white" : "rgba(255,255,255,0.35)",
          }}
        >
          {n}
        </button>
      ))}

      {/* RIGHT DOTS + LAST PAGE */}
      {page < totalPages - 2 && (
        <>
          <span className="text-white/30 px-1">...</span>
          <button
            onClick={() => goToPage(totalPages)}
            className="w-7 h-7 rounded-[8px] text-xs font-medium transition-all"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {totalPages}
          </button>
        </>
      )}

    </div>

    <button
      disabled={page === totalPages}
      onClick={() => goToPage(page + 1)}
      className="px-4 py-2 rounded-[10px] text-sm font-medium transition-all disabled:opacity-25"
      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}
    >
      Next →
    </button>
  </div>
)}
            </div>
          </main>
        </div>
      </div>

      {/* ── Compiler Side Panel ── */}
      {showCompiler && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          style={{ background: "rgba(0,0,0,0.65)" }}
          onClick={(e) => e.target === e.currentTarget && setShowCompiler(false)}
        >
          <div
            className="w-[520px] flex flex-col border-l shadow-2xl"
            style={{ background: "#0F0F1A", borderColor: "rgba(255,255,255,0.08)" }}
          >
            {/* Compiler header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b"
              style={{ borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="flex items-center gap-2">
                <Code2 size={14} style={{ color: "#6C3EF4" }} />
                <span className="text-sm font-semibold text-white">Compiler</span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background: `${TYPE_COLOR}15`,
                    color: TYPE_COLOR,
                    border: `1px solid ${TYPE_COLOR}30`,
                  }}
                >
                  {compilerCategory} · {compilerLang}
                </span>
              </div>
              <button
                onClick={() => setShowCompiler(false)}
                className="w-7 h-7 rounded-[8px] flex items-center justify-center hover:bg-white/5 transition"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <CompilerPanel defaultLanguage={compilerLang} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}