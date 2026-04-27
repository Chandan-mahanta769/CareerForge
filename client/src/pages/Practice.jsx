import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Star, CheckCircle, Copy, ArrowLeft,
  ChevronDown, BookOpen, Heart, Code2, Check, Eye, EyeOff
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getQuestionsByType } from "../utils/questionLoader";
import CompilerPanel from "./CompilerPanel";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import { glassCardStyle, dashboardAuroraBackground } from "../utils/uiTheme";
import {
  getUserProfile,
  getPracticeStats,
  togglePracticeFavorite,
  togglePracticeSolved,
} from "../services/api";


// ── constants ──────────────────────────────────────────────
const TOPICS = [
  { id: "html",    label: "HTML",    color: "#FF6B35" },
  { id: "css",     label: "CSS",     color: "#3B8BFF" },
  { id: "js",      label: "JS",      color: "#F59E0B" },
  { id: "react",   label: "React",   color: "#61DAFB" },
  { id: "node",    label: "Node",    color: "#10B981" },
  { id: "mongodb", label: "MongoDB", color: "#4DB33D" },
  { id: "dsa",     label: "DSA",     color: "#8E44AD" },

];
const CATEGORIES = ["Beginner", "Intermediate", "Advanced"];
const CAT_COLORS  = { Beginner: "#10B981", Intermediate: "#F59E0B", Advanced: "#EF4444" };
const PER_PAGE    = 6;

// ── dropdown component ──
const Dropdown = ({ open, setOpen, label, color, items, onSelect, refEl }) => (
  <div className="relative z-[90]" ref={refEl}>
    <button
      onClick={() => setOpen(o => !o)}
      className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all border"
      style={{
        background: open ? "rgba(108,62,244,0.2)" : "rgba(255,255,255,0.06)",
        borderColor: open ? "rgba(108,62,244,0.45)" : "rgba(255,255,255,0.1)",
        color: color || "white",
      }}
    >
      {color && <span className="w-2 h-2 rounded-full" style={{ background: color }} />}
      {label}
      <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} style={{ color: "rgba(255,255,255,0.4)" }} />
    </button>
    {open && (
      <div
        className="absolute top-full mt-1 left-0 min-w-[220px] rounded-xl border z-[120] shadow-2xl transition-all duration-200 animate-in fade-in zoom-in-95"
        style={{
          background: "rgba(10,12,24,0.98)",
          borderColor: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        {items.map(item => (
          <button
            key={item.id || item}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect(item.id || item)}
            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-left transition-all hover:bg-white/8"
            style={{ color: item.color || (label === (item.id || item) ? "white" : "rgba(255,255,255,0.6)") }}
          >
            {item.color && <span className="w-2 h-2 rounded-full" style={{ background: item.color }} />}
            {item.label || item}
          </button>
        ))}
      </div>
    )}
  </div>
);

export default function PracticePage() {
  const navigate = useNavigate();

  // ── state ──
  const savedTopic = localStorage.getItem("cf_practice_topic") || "html";
  const savedCat   = localStorage.getItem("cf_practice_category") || "Beginner";
  const savedView  = localStorage.getItem("cf_practice_view") || "all";

  const [topic,        setTopic]        = useState(savedTopic);
  const [category,     setCategory]     = useState(savedCat);
  const [view,         setView]         = useState(savedView); // "all" | "favorites"
  const [catOpen,      setCatOpen]      = useState(false);
  const [topicOpen,    setTopicOpen]    = useState(false);
  const [showCompiler, setShowCompiler] = useState(false);
  const [page,         setPage]         = useState(1);
  const [copied,       setCopied]       = useState(null);
  const [hoveredCard,  setHoveredCard]  = useState(null);
  const [visibleAnswers, setVisibleAnswers] = useState({});
  const [user, setUser] = useState(null);

  const [solved,    setSolved]    = useState([]);
  const [favorites, setFavorites] = useState([]);

  const catRef   = useRef(null);
  const topicRef = useRef(null);

  // close dropdowns on outside click
  useEffect(() => {
    const h = (e) => {
      if (catRef.current   && !catRef.current.contains(e.target))   setCatOpen(false);
      if (topicRef.current && !topicRef.current.contains(e.target)) setTopicOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  useEffect(() => {
    getUserProfile().then(setUser).catch(() => navigate("/login"));
  }, [navigate]);

  useEffect(() => {
    getPracticeStats()
      .then((data) => {
        setSolved(data?.solved || []);
        setFavorites(data?.favorites || []);
      })
      .catch(() => {});
  }, []);

  // ── data ──
  const allQ      = useMemo(() => getQuestionsByType(topic), [topic]);
  const questions = useMemo(() => allQ[category] || [], [allQ, category]);

  const changeTopic = (t) => {
    setTopic(t);
    setPage(1);
    setTopicOpen(false);
    localStorage.setItem("cf_practice_topic", t);
  };

  const changeCategory = (c) => {
    setCategory(c);
    setPage(1);
    setCatOpen(false);
    localStorage.setItem("cf_practice_category", c);
  };

  const changeView = (v) => {
    setView(v);
    setPage(1);
    localStorage.setItem("cf_practice_view", v);
  };

  const questionKey = (id) => `${topic}:${id}`;

  const toggleSolved = async (id, title) => {
    const key = questionKey(id);
    const willSolve = !solved.includes(key);
    const previous = solved;
    const optimistic = willSolve ? [...previous, key] : previous.filter((x) => x !== key);
    setSolved(optimistic);
    try {
      const data = await togglePracticeSolved(id, topic, title, willSolve);
      setSolved(data?.solved || optimistic);
    } catch {
      setSolved(previous);
    }
  };

  const toggleFavorite = async (id) => {
    const key = questionKey(id);
    const previous = favorites;
    const optimistic = previous.includes(key)
      ? previous.filter((x) => x !== key)
      : [...previous, key];
    setFavorites(optimistic);
    try {
      const data = await togglePracticeFavorite(id, topic);
      setFavorites(data?.favorites || optimistic);
    } catch {
      setFavorites(previous);
    }
  };

  const copyAnswer = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 1500);
  };

  const toggleAnswer = (id) => {
    setVisibleAnswers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // ── derived ──
  const solvedInCat  = questions.filter(q => solved.includes(questionKey(q.id))).length;
  const accuracy     = questions.length ? Math.round((solvedInCat / questions.length) * 100) : 0;
  const displayList  = view === "favorites" ? questions.filter(q => favorites.includes(questionKey(q.id))) : questions;
  const totalPages   = Math.ceil(displayList.length / PER_PAGE);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return displayList.slice(start, start + PER_PAGE);
  }, [displayList, page]);

  const currentTopic = TOPICS.find(t => t.id === topic);

  useEffect(() => {
    if (!currentTopic && TOPICS.length) {
      setTopic(TOPICS[0].id);
      localStorage.setItem("cf_practice_topic", TOPICS[0].id);
    }
    if (!CATEGORIES.includes(category)) {
      setCategory(CATEGORIES[0]);
      localStorage.setItem("cf_practice_category", CATEGORIES[0]);
    }
  }, [currentTopic, category]);

  useEffect(() => {
    if (view === "favorites") {
      const hasFavInSelection = questions.some((q) => favorites.includes(q.id));
      if (!hasFavInSelection) {
        setView("all");
        localStorage.setItem("cf_practice_view", "all");
      }
    }
  }, [view, questions, favorites]);

  return (
    <div
      className="min-h-screen font-['Inter'] flex flex-col"
      style={{
        background: dashboardAuroraBackground,
      }}
    >
      <DashboardNavbar user={user} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <div className="flex flex-col flex-1 overflow-hidden">
          {/* ── SECOND NAV ── */}
          <div
            className="relative z-40 overflow-visible shrink-0 px-3 sm:px-4 py-2 flex flex-wrap items-center gap-2 sm:gap-3 border-b"
            style={{
              minHeight: "60px",
              borderColor: "rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
          >
            {/* Back */}
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-sm transition-all hover:bg-white/5"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              <ArrowLeft size={14} />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="hidden sm:block w-px h-5" style={{ background: "rgba(255,255,255,0.1)" }} />

            {/* Category dropdown */}
            <Dropdown
              open={catOpen} setOpen={setCatOpen}
              label={category} color={CAT_COLORS[category]}
              items={CATEGORIES.map(c => ({ id: c, label: c, color: CAT_COLORS[c] }))}
              onSelect={changeCategory} refEl={catRef}
            />

            {/* Topic dropdown */}
            <Dropdown
              open={topicOpen} setOpen={setTopicOpen}
            label={currentTopic?.label || "Topic"} color={currentTopic?.color || "#6C3EF4"}
              items={TOPICS}
              onSelect={changeTopic} refEl={topicRef}
            />

            <div className="flex-1 min-w-[8px]" />

            {/* Accuracy pill */}
            <div
              className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl text-xs border"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.55)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="w-16 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div className="h-1 rounded-full bg-green-500 transition-all" style={{ width: `${accuracy}%` }} />
              </div>
              <span>{solvedInCat}/{questions.length}</span>
            </div>

            {/* View toggles */}
            <div className="order-last sm:order-none w-full sm:w-auto flex items-center gap-1 p-1 rounded-xl border" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.1)" }}>
              <button
                onClick={() => changeView("all")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: view === "all" ? "rgba(108,62,244,0.3)" : "transparent",
                  color: view === "all" ? "white" : "rgba(255,255,255,0.4)",
                }}
              >
                <BookOpen size={12} /> All
              </button>
              <button
                onClick={() => changeView("favorites")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  background: view === "favorites" ? "rgba(234,179,8,0.2)" : "transparent",
                  color: view === "favorites" ? "#FBBF24" : "rgba(255,255,255,0.4)",
                }}
              >
                <Heart size={12} />
                Favs
                {favorites.length > 0 && (
                  <span className="ml-0.5 px-1 rounded text-xs" style={{ background: "rgba(251,191,36,0.2)", color: "#FBBF24" }}>
                    {favorites.length}
                  </span>
                )}
              </button>
            </div>

            {/* Compiler button */}
            <button
              onClick={() => setShowCompiler(true)}
              className="ml-auto sm:ml-0 flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-white transition-all hover:opacity-90 border"
              style={{ background: "linear-gradient(135deg, #6C3EF4, #3B8BFF)" }}
            >
              <Code2 size={13} />
              <span className="hidden sm:inline">Compiler</span>
            </button>
          </div>

          {/* ── MAIN CONTENT ── */}
          <div className="relative z-0 flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 py-6">

            {/* Page title */}
            <div
              className="flex flex-wrap items-center justify-between gap-3 mb-5 rounded-2xl border px-4 py-3"
              style={glassCardStyle(currentTopic?.color || "#6C3EF4")}
            >
              <div className="flex items-center gap-3">
                <h1 className="text-base font-semibold text-white">
                  {currentTopic?.label || "Topic"}
                  <span className="mx-2" style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                  <span style={{ color: CAT_COLORS[category] }}>{category}</span>
                </h1>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.35)" }}>
                  {view === "favorites" ? `${displayList.length} saved` : `${questions.length} questions`}
                </span>
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>
                Page {page}/{totalPages || 1}
              </span>
            </div>

            {/* Empty state */}
            {paginated.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 gap-3">
                <div className="text-4xl">{view === "favorites" ? "⭐" : "📭"}</div>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {view === "favorites"
                    ? "No favorites yet — star questions to save them here."
                    : "No questions found for this topic & category."}
                </p>
              </div>
            )}

            {/* Question cards */}
            <div className="grid grid-cols-1 gap-4">
              {paginated.map((q, i) => {
                const isSolved = solved.includes(questionKey(q.id));
                const isFav    = favorites.includes(questionKey(q.id));
                const isCopied = copied === q.id;

                return (
                  <div
                    key={q.id}
                    onMouseEnter={() => setHoveredCard(q.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      ...glassCardStyle(isSolved ? "#10B981" : (currentTopic?.color || "#6C3EF4"), isSolved),
                      boxShadow: hoveredCard === q.id
                        ? `0 14px 42px ${(isSolved ? "#10B981" : (currentTopic?.color || "#6C3EF4"))}33`
                        : glassCardStyle(isSolved ? "#10B981" : (currentTopic?.color || "#6C3EF4"), isSolved).boxShadow,
                    }}
                  >
                    {/* Card header */}
                    <div className="flex items-start justify-between gap-3 px-4 pt-4 pb-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                      <div className="flex items-start gap-3">
                        {/* Number badge */}
                        <span
                          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-mono font-bold mt-0.5"
                          style={{
                            background: isSolved ? "rgba(16,185,129,0.18)" : `${currentTopic?.color || "#6C3EF4"}26`,
                            color: isSolved ? "#10B981" : (currentTopic?.color || "#6C3EF4"),
                          }}
                        >
                          {(page - 1) * PER_PAGE + i + 1}
                        </span>
                        <div>
                          <h3 className="text-sm font-semibold text-white leading-snug">{q.title}</h3>
                          <p className="text-[13px] mt-1.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.62)" }}>{q.problem}</p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => toggleFavorite(q.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10 border"
                          title="Favorite"
                          style={{ borderColor: "rgba(255,255,255,0.08)" }}
                        >
                          <Star size={13} className={isFav ? "fill-yellow-400 text-yellow-400" : ""} style={{ color: isFav ? "#FBBF24" : "rgba(255,255,255,0.25)" }} />
                        </button>
                        <button
                          onClick={() => toggleSolved(q.id, q.title)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center transition-all hover:bg-white/10 border"
                          title="Mark solved"
                          style={{ borderColor: "rgba(255,255,255,0.08)" }}
                        >
                          <CheckCircle size={13} style={{ color: isSolved ? "#10B981" : "rgba(255,255,255,0.25)" }} />
                        </button>
                      </div>
                    </div>

                    {/* Hint */}
                    {q.hint && (
                      <div className="mx-4 mt-3 mb-3 px-3 py-2 rounded-lg flex items-start gap-2 border" style={{ background: "rgba(245,158,11,0.09)", borderColor: "rgba(245,158,11,0.32)" }}>
                        <span className="text-xs" style={{ color: "#F59E0B" }}>💡 </span>
                        <p className="text-xs leading-relaxed" style={{ color: "rgba(245,158,11,0.8)" }}>{q.hint}</p>
                      </div>
                    )}

                    {/* Answer toggle + block */}
                    {q.answer && (
                      <div className="mx-4 mt-3 mb-2">
                        <button
                          onClick={() => toggleAnswer(q.id)}
                          className="w-full flex items-center justify-between text-xs px-3 py-2 rounded-lg border transition-all hover:bg-white/5"
                          style={{ borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.7)" }}
                        >
                          <span className="flex items-center gap-2 font-medium">
                            {visibleAnswers[q.id] ? <EyeOff size={13} /> : <Eye size={13} />}
                            {visibleAnswers[q.id] ? "Hide Answer" : "Show Answer"}
                          </span>
                          <ChevronDown
                            size={14}
                            className={`transition-transform duration-200 ${visibleAnswers[q.id] ? "rotate-180" : ""}`}
                            style={{ color: "rgba(255,255,255,0.5)" }}
                          />
                        </button>
                      </div>
                    )}

                    {q.answer && visibleAnswers[q.id] && (
                      <div className="mx-4 mb-4 rounded-xl overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                        <div className="flex items-center justify-between px-3 py-2 border-b" style={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.08)" }}>
                          <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.3)" }}>answer</span>
                          <button
                            onClick={() => copyAnswer(q.answer, q.id)}
                            className="flex items-center gap-1 text-xs px-2 py-1 rounded-md transition-all border"
                            style={{
                              background: isCopied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
                              color: isCopied ? "#10B981" : "rgba(255,255,255,0.35)",
                              borderColor: isCopied ? "rgba(16,185,129,0.35)" : "rgba(255,255,255,0.09)",
                            }}
                          >
                            {isCopied ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy</>}
                          </button>
                        </div>
                        <pre className="p-3 text-xs overflow-auto leading-relaxed" style={{ color: "#A7F3D0", background: "rgba(0,0,0,0.34)", fontFamily: "monospace" }}>
                          {q.answer}
                        </pre>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between mt-6 pt-4 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                <button
                  disabled={page === 1}
                  onClick={() => { setPage(p => p - 1); window.scrollTo(0, 0); }}
                  className="px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-25 border"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.1)" }}
                >
                  ← Prev
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className="w-8 h-8 rounded-lg text-xs font-medium transition-all border"
                      style={{
                        background: page === n ? "rgba(108,62,244,0.3)" : "rgba(255,255,255,0.04)",
                        color: page === n ? "white" : "rgba(255,255,255,0.35)",
                        borderColor: page === n ? "rgba(108,62,244,0.55)" : "rgba(255,255,255,0.08)",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => { setPage(p => p + 1); window.scrollTo(0, 0); }}
                  className="px-4 py-2 rounded-xl text-sm transition-all disabled:opacity-25 border"
                  style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)", borderColor: "rgba(255,255,255,0.1)" }}
                >
                  Next →
                </button>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>

      {/* ── COMPILER PANEL ── */}
      {showCompiler && (
        <div className="fixed inset-0 z-50 flex justify-end" style={{ background: "rgba(0,0,0,0.7)" }}>
          <div
            className="w-[520px] flex flex-col border-l shadow-2xl"
            style={{ background: "#0F0F1A", borderColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <Code2 size={14} style={{ color: "#6C3EF4" }} /> Compiler
              </span>
              <button onClick={() => setShowCompiler(false)} className="text-xs px-3 py-1 rounded-lg hover:bg-white/5" style={{ color: "rgba(255,255,255,0.4)" }}>
                Close ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <CompilerPanel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}