import { useState, useEffect } from "react";
import { useParams, useNavigate, Link, useLocation } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import { getTopic, submitQuiz, getQuizResult, updateStepProgress, getUserProfile } from "../services/api";
import { dashboardAuroraBackground } from "../utils/uiTheme";

const glassCard = (color = "#6C3EF4", glow = false) => ({
    background: glow
        ? `linear-gradient(135deg, ${color}22, rgba(255,255,255,0.08))`
        : `linear-gradient(145deg, ${color}12, rgba(255,255,255,0.04))`,
    border: `1px solid ${glow ? `${color}55` : `${color}30`}`,
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: glow ? `0 12px 36px ${color}26` : "0 10px 26px rgba(2,8,23,0.2)",
    borderRadius: "16px",
});

// ── YouTube Embed ─────────────────────────────────────────────────
function VideoSection({ youtubeId }) {
    if (!youtubeId) return (
        <div
            className="w-full aspect-video flex items-center justify-center rounded-[16px]"
            style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
            <p className="text-white/20 text-sm">No video added yet</p>
        </div>
    );

    const youtubeUrl = `https://www.youtube.com/watch?v=${youtubeId}`;

    return (
        <div className="p-5" style={glassCard("#EF4444", true)}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>▶</span> Watch Lesson
                </h3>
                <a
                    href={youtubeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs px-3 py-1 rounded-full border border-red-400/30 text-red-300 hover:text-red-200 transition"
                >
                    Open on YouTube
                </a>
            </div>
            <div className="w-full aspect-video rounded-[14px] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
                <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${youtubeId}`}
                    title="Topic Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

// ── Notes Section ─────────────────────────────────────────────────
function NotesSection({ notes, shortNotes, notesPdfUrl }) {
    return (
        <div className="p-6" style={glassCard("#3B8BFF")}>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span>📝</span> Short Notes
            </h3>
            {shortNotes || notes ? (
                <div className="text-sm text-white/70 leading-relaxed whitespace-pre-line">{notes}</div>
            ) : (
                <p className="text-white/20 text-sm">Notes coming soon...</p>
            )}
            <div className="mt-4 pt-4 border-t border-white/10">
                <a
                    href={notesPdfUrl || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border border-[#3B8BFF]/35 text-[#93C5FD] hover:text-[#BFDBFE] transition"
                    style={{ pointerEvents: notesPdfUrl ? "auto" : "none", opacity: notesPdfUrl ? 1 : 0.5 }}
                >
                    📄 Open Topic Notes PDF
                </a>
            </div>
        </div>
    );
}

// ── Real World Example ────────────────────────────────────────────
function ExampleSection({ example, problem }) {
    return (
        <div className="p-6" style={glassCard("#10B981")}>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span>🌍</span> Real-World Example
            </h3>
            {example ? (
                <div className="text-sm text-white/70 leading-relaxed whitespace-pre-line">{example}</div>
            ) : (
                <p className="text-white/20 text-sm">Example coming soon...</p>
            )}
            <div className="mt-4">
                <h4 className="text-xs font-semibold text-emerald-300 mb-2">Real-World Problem</h4>
                <p className="text-sm text-white/65 leading-relaxed whitespace-pre-line">
                    {problem || "A practical challenge for this topic will appear here."}
                </p>
            </div>
        </div>
    );
}

// ── Resources ─────────────────────────────────────────────────────
function ResourcesSection({ resources }) {
    return (
        <div className="p-6" style={glassCard("#F59E0B")}>
            <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <span>🔗</span> Resources
            </h3>
            {resources?.length ? (
                <div className="flex flex-col gap-2">
                    {resources.map((r, i) => (
                        <a
                            key={i}
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-sm text-[#F59E0B] hover:text-[#FCD34D] transition group"
                        >
                            <span className="text-xs">→</span>
                            <span className="group-hover:underline">{r.label}</span>
                        </a>
                    ))}
                </div>
            ) : (
                <p className="text-white/20 text-sm">Resources coming soon...</p>
            )}
        </div>
    );
}

// ── Mini Quiz ─────────────────────────────────────────────────────
function QuizSection({ quiz, topicId, stepId, stackId, previousResult }) {
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(previousResult || null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");

    const allAnswered = quiz?.length && Object.keys(answers).length === quiz.length;

    const selectAnswer = (question, option) => {
        if (result) return; // locked after submit
        setAnswers(prev => ({ ...prev, [question]: option }));
    };

    const handleSubmit = async () => {
        if (!allAnswered) return;
        setSubmitting(true);
        setError("");
        try {
            const formatted = Object.entries(answers).map(([question, selected]) => ({
                question, selected,
            }));
            const res = await submitQuiz(topicId, stepId, stackId, formatted);
            setResult(res);
        } catch {
            setError("Failed to submit. Try again.");
        }
        setSubmitting(false);
    };

    const retake = () => {
        setAnswers({});
        setResult(null);
    };

    const scoreColor = result
        ? result.percent >= 80 ? "#10B981"
            : result.percent >= 50 ? "#F59E0B"
                : "#FF6B35"
        : "#6C3EF4";

    if (!quiz?.length) return (
        <div className="p-6" style={glassCard("#6C3EF4")}>
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <span>🔥</span> Mini Quiz
            </h3>
            <p className="text-white/20 text-sm">Quiz coming soon...</p>
        </div>
    );

    return (
        <div className="p-6" style={glassCard("#6C3EF4", true)}>
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <span>🔥</span> Mini Quiz
                    <span className="text-xs text-white/30 font-normal">{quiz.length} questions</span>
                </h3>
                {result && (
                    <button
                        onClick={retake}
                        className="text-xs px-3 py-1 rounded-full border border-white/10 text-white/40 hover:text-white hover:border-white/20 transition"
                    >
                        Retake
                    </button>
                )}
            </div>

            {/* Result banner */}
            {result && (
                <div
                    className="p-4 rounded-[12px] mb-6 text-center"
                    style={{ background: `${scoreColor}15`, border: `1px solid ${scoreColor}30` }}
                >
                    <p className="text-3xl font-bold mb-1" style={{ color: scoreColor }}>
                        {result.percent}%
                    </p>
                    <p className="text-sm text-white/60">
                        {result.score} / {result.total} correct
                    </p>
                    <p className="text-xs mt-1" style={{ color: scoreColor }}>
                        {result.percent >= 80 ? "Excellent! 🎉" : result.percent >= 50 ? "Good effort! Keep going 💪" : "Review the topic and try again 📚"}
                    </p>
                </div>
            )}

            {/* Questions */}
            <div className="flex flex-col gap-6">
                {quiz.map((q, qi) => {
                    const selectedAns = answers[q.question];
                    const resultAns = result?.answers?.find(a => a.question === q.question);

                    return (
                        <div key={qi}>
                            <p className="text-sm text-white/80 mb-3 font-medium">
                                <span className="text-white/30 mr-2">Q{qi + 1}.</span>
                                {q.question}
                                <span
                                    className="ml-2 text-xs px-2 py-0.5 rounded-full"
                                    style={{
                                        background: q.type === "mcq" ? "rgba(108,62,244,0.2)" : "rgba(59,139,255,0.2)",
                                        color: q.type === "mcq" ? "#6C3EF4" : "#3B8BFF",
                                    }}
                                >
                                    {q.type === "mcq" ? "MCQ" : "True/False"}
                                </span>
                            </p>

                            <div className="flex flex-col gap-2">
                                {q.options.map((opt, oi) => {
                                    let borderColor = "rgba(255,255,255,0.08)";
                                    let bgColor = "rgba(255,255,255,0.03)";
                                    let textColor = "rgba(255,255,255,0.6)";

                                    if (result && resultAns) {
                                        if (opt === resultAns.correct) {
                                            borderColor = "#10B981";
                                            bgColor = "rgba(16,185,129,0.1)";
                                            textColor = "#10B981";
                                        } else if (opt === resultAns.selected && !resultAns.isCorrect) {
                                            borderColor = "#FF6B35";
                                            bgColor = "rgba(255,107,53,0.1)";
                                            textColor = "#FF6B35";
                                        }
                                    } else if (selectedAns === opt) {
                                        borderColor = "#6C3EF4";
                                        bgColor = "rgba(108,62,244,0.15)";
                                        textColor = "white";
                                    }

                                    return (
                                        <button
                                            key={oi}
                                            onClick={() => selectAnswer(q.question, opt)}
                                            className="text-left px-4 py-3 rounded-[10px] text-sm transition-all duration-200"
                                            style={{
                                                border: `1px solid ${borderColor}`,
                                                background: bgColor,
                                                color: textColor,
                                                cursor: result ? "default" : "pointer",
                                            }}
                                        >
                                            <span className="text-white/30 mr-2 text-xs">
                                                {String.fromCharCode(65 + oi)}.
                                            </span>
                                            {opt}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Submit */}
            {!result && (
                <div className="mt-6">
                    {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
                    <button
                        onClick={handleSubmit}
                        disabled={!allAnswered || submitting}
                        className="w-full py-3 rounded-[10px] text-white font-semibold text-sm transition hover:opacity-90"
                        style={{
                            backgroundImage: allAnswered
                                ? "linear-gradient(135deg, #6C3EF4, #3B8BFF)"
                                : "none",
                            background: allAnswered ? undefined : "rgba(255,255,255,0.05)",
                            color: allAnswered ? "white" : "rgba(255,255,255,0.2)",
                            cursor: allAnswered ? "pointer" : "not-allowed",
                        }}
                    >
                        {submitting ? "Submitting..." : allAnswered ? "Submit Quiz 🔥" : `Answer all questions (${Object.keys(answers).length}/${quiz.length})`}
                    </button>
                </div>
            )}
        </div>
    );
}

// ── Main Topic Page ───────────────────────────────────────────────
export default function TopicPage() {
    const { categoryId, trackId, stackId, stepId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [topic, setTopic] = useState(null);
    const [quizResult, setQuizResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [completing, setCompleting] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const load = async () => {
            try {
                const [profile, topicData] = await Promise.all([
                    getUserProfile(),
                    getTopic(categoryId, trackId, stackId, stepId),
                ]);
                setUser(profile);
                if (!topicData) { setNotFound(true); setLoading(false); return; }
                setTopic(topicData);
                // fetch previous quiz result
                try {
                    const prev = await getQuizResult(topicData._id);
                    setQuizResult(prev);
                } catch {
                    // No previous result
                }
            } catch {
                navigate("/login");
            }
            setLoading(false);
        };
        load();
    }, [categoryId, trackId, stackId, stepId, navigate]);

    const goBack = () => {
        if (location.state?.fromPath) navigate(location.state.fromPath);
        else navigate(-1);
    };

    const markComplete = async () => {
        setCompleting(true);
        try {
            await updateStepProgress(categoryId, trackId, stackId, stepId, true);
            setCompleted(true);
        } catch (err) {
            console.error(err);
        }
        setCompleting(false);
    };

    if (loading) return (
        <div className="min-h-screen dark:bg-[#0F0F1A] flex items-center justify-center">
            <p className="text-white/30 text-sm">Loading topic...</p>
        </div>
    );

    return (
        <div
            className="min-h-screen font-['Inter'] flex flex-col"
            style={{ background: dashboardAuroraBackground }}
        >
            <DashboardNavbar user={user} />
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                <main className="flex-1 overflow-y-auto p-6 max-w-4xl">

                    <button
                        onClick={goBack}
                        className="mb-4 text-sm px-3 py-1.5 rounded-[10px] border border-white/15 text-white/70 hover:text-white hover:border-white/25 transition"
                    >
                        ← Back
                    </button>

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-white/30 mb-6 flex-wrap">
                        <Link to="/roadmap" className="hover:text-white transition">Roadmap</Link>
                        <span>/</span>
                        <Link to="/roadmap" className="hover:text-white transition capitalize">{categoryId}</Link>
                        <span>/</span>
                        <Link to="/roadmap" className="hover:text-white transition capitalize">{stackId}</Link>
                        <span>/</span>
                        <span className="text-white/60 capitalize">{stepId}</span>
                    </div>

                    {notFound ? (
                        /* Topic not in DB yet — show empty state */
                        <div
                            className="p-10 text-center rounded-[16px]"
                            style={{ background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.08)" }}
                        >
                            <p className="text-4xl mb-4">📭</p>
                            <h2 className="text-white font-semibold text-lg mb-2">Topic content coming soon</h2>
                            <p className="text-white/30 text-sm mb-6">
                                This topic hasn't been added to the database yet.
                            </p>
                            <button
                                onClick={goBack}
                                className="text-sm font-semibold px-5 py-2.5 rounded-[10px] text-white hover:opacity-90 transition"
                                style={{ backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)" }}
                            >
                                ← Go Back
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-6">

                            {/* Title */}
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-1">{topic.title}</h1>
                                <p className="text-xs text-white/30 capitalize">{categoryId} › {trackId} › {stackId} › {stepId}</p>
                            </div>

                            {/* Video */}
                            <VideoSection youtubeId={topic.youtubeId} />

                            {/* Notes + Example side by side on large screens */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <NotesSection notes={topic.notes} shortNotes={topic.shortNotes} notesPdfUrl={topic.notesPdfUrl} />
                                <ExampleSection example={topic.realWorldExample} problem={topic.realWorldProblem} />
                            </div>

                            {/* Resources */}
                            <ResourcesSection resources={topic.resources} />

                            {/* Quiz */}
                            <QuizSection
                                quiz={topic.quiz}
                                topicId={topic._id}
                                stepId={stepId}
                                stackId={stackId}
                                previousResult={quizResult}
                            />

                            {/* Mark Complete Button */}
                            <div
                                className="p-6 flex items-center justify-between rounded-[16px]"
                                style={glassCard(completed ? "#10B981" : "#6C3EF4", completed)}
                            >
                                <div>
                                    <h3 className="text-white font-semibold text-sm mb-1">
                                        {completed ? "🎉 Topic Completed!" : "Finished this topic?"}
                                    </h3>
                                    <p className="text-white/40 text-xs">
                                        {completed
                                            ? "Great job! Head back to continue your roadmap."
                                            : "Mark it complete to track your progress."}
                                    </p>
                                </div>
                                {completed ? (
                                    <Link
                                        to={location.state?.fromPath || "/roadmap"}
                                        className="px-5 py-2.5 rounded-[10px] text-white text-sm font-semibold hover:opacity-90 transition"
                                        style={{ backgroundImage: "linear-gradient(135deg, #10B981, #059669)" }}
                                    >
                                        Continue Learning →
                                    </Link>
                                ) : (
                                    <button
                                        onClick={markComplete}
                                        disabled={completing}
                                        className="px-5 py-2.5 rounded-[10px] text-white text-sm font-semibold hover:opacity-90 transition"
                                        style={{ backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)" }}
                                    >
                                        {completing ? "Saving..." : "Mark as Complete ✓"}
                                    </button>
                                )}
                            </div>

                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}