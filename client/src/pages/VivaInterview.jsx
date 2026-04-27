import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Star, ChevronDown, Copy, Check } from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import { getUserProfile } from "../services/api";
import { vivaQuestions } from "../data/vivaQuestions";

const PER_PAGE = 5;
const TYPE_COLOR = "#10B981";
const LS_KEY = "cf_interview_bookmarks_viva";

// ── Single Question Card ───────────────────────────────────
function VivaCard({ question, globalIndex, isBookmarked, onBookmark }) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showFollowUp, setShowFollowUp] = useState(false);
    const [copied, setCopied] = useState(false);

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
                    <p className="text-sm font-semibold text-white leading-relaxed mb-2">
                        {question.question}
                    </p>
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

            {/* ── Sample Answer ── FIRST & HIDDEN ── */}
            <div className="border-t border-white/[0.06]">
                <button
                    onClick={() => setShowAnswer(o => !o)}
                    className="w-full px-5 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-all"
                    style={{ color: showAnswer ? TYPE_COLOR : "rgba(255,255,255,0.45)" }}
                >
                    <span className="text-sm font-medium flex items-center gap-2">
                        ✨ Sample Answer
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
                            style={{ background: `${TYPE_COLOR}08`, borderColor: `${TYPE_COLOR}25` }}
                        >
                            <div className="flex justify-end px-4 py-2 border-b border-white/[0.05]">
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
                            <div className="p-4">
                                <p className="text-sm text-white/65 leading-relaxed whitespace-pre-wrap">
                                    {question.answer}
                                </p>
                            </div>
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
                                className="rounded-[10px] p-4 space-y-2"
                                style={{
                                    background: "rgba(245,158,11,0.05)",
                                    border: "1px solid rgba(245,158,11,0.15)",
                                }}
                            >
                                {question.followUp.map((fq, idx) => (
                                    <div key={idx} className="flex gap-2">
                                        <span
                                            className="text-xs font-bold flex-shrink-0 mt-0.5"
                                            style={{ color: "#F59E0B" }}
                                        >
                                            Q{idx + 1}.
                                        </span>
                                        <p className="text-xs text-white/60 leading-relaxed">{fq}</p>
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
export default function VivaInterviewPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [page, setPage] = useState(1);
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

    const totalPages = Math.ceil(vivaQuestions.length / PER_PAGE);

    const paginated = useMemo(() => {
        const start = (page - 1) * PER_PAGE;
        return vivaQuestions.slice(start, start + PER_PAGE);
    }, [page]);

    const handleBookmark = (id) =>
        setBookmarks(prev =>
            prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id]
        );

    const goToPage = (n) => { setPage(n); window.scrollTo(0, 0); };

    const getVisiblePages = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        }

        // FIRST PAGE
        if (page === 1) {
            return [1, 2, 3, 4, 5];
        }

        // SECOND PAGE (FIXED)
        if (page === 2) {
            return [1, 2, 3, 4, 5];
        }

        // LAST PAGE
        if (page === totalPages) {
            return [
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        // SECOND LAST PAGE
        if (page === totalPages - 1) {
            return [
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ];
        }

        // MIDDLE (center current page)
        return [
            page - 2,
            page - 1,
            page,
            page + 1,
            page + 2,
        ];
    };

    return (
        <div
            className="min-h-screen font-['Inter'] flex flex-col"
            style={{
                background:
                    "radial-gradient(ellipse at 20% 0%, #0a2818 0%, #0F0F1A 45%, #080d1a 100%)",
            }}
        >
            {/* Glow blobs */}
            <div
                className="fixed top-0 left-1/4 w-[450px] h-[450px] rounded-full pointer-events-none"
                style={{ background: "rgba(16,185,129,0.06)", filter: "blur(100px)", zIndex: 0 }}
            />
            <div
                className="fixed bottom-1/4 right-1/3 w-[350px] h-[350px] rounded-full pointer-events-none"
                style={{ background: "rgba(59,139,255,0.04)", filter: "blur(80px)", zIndex: 0 }}
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
                                    Viva Interview
                                </span>
                                <span className="text-xs text-white/35">
                                    {vivaQuestions.length} questions
                                </span>
                            </div>

                            <div className="flex-1" />
                            <span className="text-xs text-white/30">Page {page}/{totalPages}</span>
                        </div>

                        {/* ── Question List ── */}
                        <div className="max-w-3xl mx-auto px-6 py-6">
                            <div className="flex flex-col gap-4">
                                {paginated.map((q, i) => (
                                    <VivaCard
                                        key={q.id}
                                        question={q}
                                        globalIndex={(page - 1) * PER_PAGE + i}
                                        isBookmarked={bookmarks.includes(q.id)}
                                        onBookmark={handleBookmark}
                                    />
                                ))}
                            </div>

                            {/* ── Pagination ── */}
                            {totalPages > 1 && (
                                <div
                                    className="flex items-center justify-between mt-8 pt-6 border-t"
                                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                                >
                                    {/* PREV */}
                                    <button
                                        disabled={page === 1}
                                        onClick={() => goToPage(page - 1)}
                                        className="px-4 py-2 rounded-[10px] text-sm font-medium transition-all disabled:opacity-25"
                                        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}
                                    >
                                        ← Prev
                                    </button>

                                    {/* PAGES */}
                                    <div className="flex items-center gap-1.5">

                                        {page > 2 && (
                                            <span className="text-white/30 px-1">...</span>
                                        )}

                                        {getVisiblePages().map(n => (
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

                                    {/* NEXT */}
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
        </div>
    );
}