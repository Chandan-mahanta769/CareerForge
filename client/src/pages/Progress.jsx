import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp, Flame, Target, BookOpen, ChevronRight,
  Zap, Trophy, Star, AlertTriangle, Calendar, BarChart3,
  CheckCircle2, Clock, ArrowRight
} from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import { getProgressOverview } from "../services/api";

// ── Design tokens ──────────────────────────────────────────
const GRAD = "linear-gradient(135deg, #6C3EF4, #3B8BFF)";

const glass = (color = "#6C3EF4", active = false) => ({
  background: active
    ? `linear-gradient(135deg, ${color}22, ${color}0a)`
    : "rgba(255,255,255,0.035)",
  border: `1px solid ${active ? color + "45" : "rgba(255,255,255,0.08)"}`,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: active
    ? `0 8px 32px ${color}25, inset 0 1px 0 rgba(255,255,255,0.06)`
    : "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
  borderRadius: "16px",
  transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
});

const TOPIC_COLORS = {
  html:    "#FF6B35",
  css:     "#3B8BFF",
  js:      "#F59E0B",
  javascript: "#F59E0B",
  react:   "#61DAFB",
  node:    "#10B981",
  mongodb: "#4DB33D",
  dsa:     "#8E44AD",
  default: "#6C3EF4",
};
const topicColor = (t = "") =>
  TOPIC_COLORS[t.toLowerCase()] || TOPIC_COLORS.default;

// ── Mini radial progress ───────────────────────────────────
function RadialProgress({ pct, size = 120, stroke = 9, color = "#6C3EF4", children }) {
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth={stroke} strokeLinecap="round"
          strokeDasharray={circ} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}

// ── Thin bar ───────────────────────────────────────────────
function Bar({ pct, color, height = 6 }) {
  return (
    <div className="w-full rounded-full overflow-hidden" style={{ height, background: "rgba(255,255,255,0.07)" }}>
      <div className="h-full rounded-full transition-all duration-700"
        style={{ width: `${Math.min(pct, 100)}%`, background: color }} />
    </div>
  );
}

// ── Section label ──────────────────────────────────────────
function SectionLabel({ icon, label, color = "#6C3EF4" }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="w-6 h-6 rounded-md flex items-center justify-center"
        style={{ background: `${color}20` }}>
        <Icon size={12} style={{ color }} />
      </div>
      <span className="text-xs font-semibold uppercase tracking-widest"
        style={{ color: "rgba(255,255,255,0.4)" }}>
        {label}
      </span>
    </div>
  );
}

// ── HERO: Overall Progress ─────────────────────────────────
function HeroSection({ roadmap, user }) {
  return (
    <div className="p-6 rounded-[20px] relative overflow-hidden"
      style={{
        backgroundImage: GRAD,
        boxShadow: "0 16px 60px rgba(108,62,244,0.45)",
      }}>
      {/* Blobs */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full"
        style={{ background: "rgba(255,255,255,0.08)", filter: "blur(30px)" }} />
      <div className="absolute -bottom-8 left-1/4 w-32 h-32 rounded-full"
        style={{ background: "rgba(255,255,255,0.06)", filter: "blur(20px)" }} />

      <div className="relative z-10 flex items-center gap-6 flex-wrap">
        {/* Circle */}
        <RadialProgress pct={roadmap.percent} size={100} stroke={7} color="rgba(255,255,255,0.85)">
          <span className="text-2xl font-bold text-white">{roadmap.percent}%</span>
        </RadialProgress>

        <div className="flex-1 min-w-0">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-1">
            Overall Progress
          </p>
          <h1 className="text-2xl font-bold text-white mb-1 truncate">
            {user.name || "Learner"}
          </h1>
          <p className="text-white/70 text-sm mb-3">
            {roadmap.currentPath || user.goal || "Web Development"}
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <div>
              <span className="text-white font-bold text-lg">{roadmap.completed}</span>
              <span className="text-white/50 text-xs ml-1">/ {roadmap.total} steps</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div>
              <span className="text-white/60 text-xs">Goal:</span>
              <span className="text-white text-xs ml-1 font-semibold">{user.goal || "Not set"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── STREAK + CALENDAR ──────────────────────────────────────
function StreakSection({ streak }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-5 rounded-[16px]" style={glass("#FF6B35", streak.current >= 3)}>
      <SectionLabel icon={Flame} label="Streak" color="#FF6B35" />

      <div className="flex items-center gap-5 mb-5">
        <div>
          <div className="flex items-end gap-1">
            <span className="text-4xl font-bold text-white">{streak.current}</span>
            <span className="text-white/40 text-sm mb-1">days</span>
          </div>
          <p className="text-xs text-white/40">Current streak</p>
        </div>
        <div className="w-px h-12 bg-white/10" />
        <div>
          <div className="flex items-end gap-1">
            <span className="text-2xl font-bold" style={{ color: "#FF6B35" }}>
              {streak.longest}
            </span>
            <span className="text-white/40 text-xs mb-0.5">days</span>
          </div>
          <p className="text-xs text-white/40">Longest streak</p>
        </div>
        <div className="flex-1" />
        <div className="text-4xl select-none">
          {streak.current >= 30 ? "🏆" : streak.current >= 7 ? "🔥" : streak.current >= 3 ? "⚡" : "✨"}
        </div>
      </div>

      {/* Calendar grid — last 30 days */}
      <p className="text-xs text-white/30 mb-2">Last 30 days</p>
      <div className="grid gap-1" style={{ gridTemplateColumns: "repeat(10, 1fr)" }}>
        {(streak.calendar || []).map((day, i) => (
          <div
            key={i}
            title={day.date}
            className="aspect-square rounded-[4px] transition-all"
            style={{
              background: day.active
                ? day.date === today
                  ? "#FF6B35"
                  : "rgba(255,107,53,0.55)"
                : "rgba(255,255,255,0.06)",
              boxShadow: day.active && day.date === today
                ? "0 0 8px rgba(255,107,53,0.6)"
                : "none",
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ── WEEKLY GRAPH ───────────────────────────────────────────
function WeeklyGraph({ weeklyGraph }) {
  const maxQ = Math.max(...weeklyGraph.map(d => d.questions), 1);
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="p-5 rounded-[16px]" style={glass("#3B8BFF")}>
      <SectionLabel icon={BarChart3} label="Weekly Activity" color="#3B8BFF" />

      <div className="flex items-end justify-between gap-2 h-28">
        {weeklyGraph.map((day, i) => {
          const pct    = (day.questions / maxQ) * 100;
          const isToday = day.date === today;
          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <span className="text-xs text-white/0 group-hover:text-white/60 transition"
                style={{ fontSize: "10px" }}>
                {day.questions}
              </span>
              <div className="w-full rounded-t-[5px] transition-all duration-700 relative"
                style={{
                  height: `${Math.max(pct, 4)}%`,
                  background: isToday ? "#3B8BFF" : day.questions > 0 ? "rgba(59,139,255,0.45)" : "rgba(255,255,255,0.06)",
                  boxShadow: isToday ? "0 0 12px rgba(59,139,255,0.5)" : "none",
                  minHeight: "6px",
                }}
              />
              <span className="text-xs font-medium"
                style={{ color: isToday ? "white" : "rgba(255,255,255,0.3)", fontSize: "10px" }}>
                {day.label}
              </span>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-white/25 mt-3 text-right">
        {weeklyGraph.reduce((s, d) => s + d.questions, 0)} questions this week
      </p>
    </div>
  );
}

// ── STATS GRID ─────────────────────────────────────────────
function StatsSection({ roadmap, practice, accuracy, topicsPracticed }) {
  const stats = [
    {
      label: "Steps Completed",
      value: roadmap.completed,
      sub: `of ${roadmap.total} total`,
      icon: CheckCircle2,
      color: "#10B981",
    },
    {
      label: "Questions Solved",
      value: practice.solved,
      sub: `${practice.favorites} favorited`,
      icon: Target,
      color: "#6C3EF4",
    },
    {
      label: "Topics Practiced",
      value: topicsPracticed.length,
      sub: "unique topics",
      icon: BookOpen,
      color: "#3B8BFF",
    },
    {
      label: "Accuracy",
      value: `${accuracy}%`,
      sub: "overall",
      icon: TrendingUp,
      color: accuracy >= 70 ? "#10B981" : accuracy >= 40 ? "#F59E0B" : "#EF4444",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {stats.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.label} className="p-4 rounded-[14px]" style={glass(s.color)}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-8 h-8 rounded-[8px] flex items-center justify-center"
                style={{ background: `${s.color}18` }}>
                <Icon size={15} style={{ color: s.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-white/40 mt-0.5">{s.label}</p>
            <p className="text-xs mt-1" style={{ color: s.color + "99" }}>{s.sub}</p>
          </div>
        );
      })}
    </div>
  );
}

// ── TOPIC ACCURACY BREAKDOWN ───────────────────────────────
function TopicsSection({ topicsPracticed }) {
  if (!topicsPracticed.length) return null;

  return (
    <div className="p-5 rounded-[16px]" style={glass("#6C3EF4")}>
      <SectionLabel icon={BookOpen} label="Topic Breakdown" color="#6C3EF4" />
      <div className="space-y-3">
        {topicsPracticed.map((t) => {
          const col = topicColor(t.topic);
          return (
            <div key={t.topic}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: col }} />
                  <span className="text-sm font-medium text-white capitalize">{t.topic}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white/40">{t.solved}/{t.attempted} correct</span>
                  <span className="text-xs font-semibold" style={{ color: col }}>
                    {t.accuracy}%
                  </span>
                </div>
              </div>
              <Bar pct={t.accuracy} color={col} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── WEAK AREAS ─────────────────────────────────────────────
function WeakAreasSection({ weakAreas }) {
  if (!weakAreas.length) {
    return (
      <div className="p-5 rounded-[16px]" style={glass("#10B981")}>
        <SectionLabel icon={AlertTriangle} label="Weak Areas" color="#F59E0B" />
        <div className="flex items-center gap-3 py-4">
          <div className="text-3xl">🎉</div>
          <div>
            <p className="text-sm font-semibold text-white">No weak areas detected!</p>
            <p className="text-xs text-white/40 mt-0.5">Keep up the great work</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-[16px]" style={glass("#F59E0B")}>
      <SectionLabel icon={AlertTriangle} label="Weak Areas" color="#F59E0B" />
      <div className="space-y-3">
        {weakAreas.map((w) => {
          const col = topicColor(w.topic);
          return (
            <div key={w.topic} className="flex items-center gap-3 p-3 rounded-[10px]"
              style={{ background: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.15)" }}>
              <div className="w-9 h-9 rounded-[8px] flex items-center justify-center font-bold text-sm flex-shrink-0"
                style={{ background: `${col}18`, color: col }}>
                {w.accuracy}%
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white capitalize">{w.topic}</p>
                <p className="text-xs text-white/40">{w.attempted} questions attempted</p>
              </div>
              <div className="text-yellow-400 text-xs font-semibold flex-shrink-0">
                Needs work
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── NEXT ACTION ────────────────────────────────────────────
function NextActionSection({ roadmap, weakAreas, navigate }) {
  const actions = [];

  // Continue roadmap
  if (roadmap.nextStep) {
    actions.push({
      icon: "🗺️",
      label: "Continue Roadmap",
      sub: "Pick up where you left off",
      color: "#6C3EF4",
      onClick: () => navigate("/roadmap"),
    });
  }

  // Practice weak area
  if (weakAreas.length > 0) {
    const weak = weakAreas[0];
    actions.push({
      icon: "🎯",
      label: `Practice ${weak.topic.toUpperCase()}`,
      sub: `${weak.accuracy}% accuracy — needs improvement`,
      color: "#F59E0B",
      onClick: () => navigate("/practice"),
    });
  }

  // Default actions
  actions.push(
    {
      icon: "💼",
      label: "Interview Prep",
      sub: "Practice HR & Technical questions",
      color: "#3B8BFF",
      onClick: () => navigate("/interview"),
    },
    {
      icon: "⚡",
      label: "Solve Practice Questions",
      sub: "Build consistency with daily practice",
      color: "#10B981",
      onClick: () => navigate("/practice"),
    }
  );

  return (
    <div className="p-5 rounded-[16px]" style={glass("#6C3EF4")}>
      <SectionLabel icon={Zap} label="Next Actions" color="#6C3EF4" />
      <div className="space-y-2.5">
        {actions.slice(0, 3).map((a, i) => (
          <button
            key={i}
            onClick={a.onClick}
            className="w-full flex items-center gap-3 p-3 rounded-[10px] border text-left transition-all hover:scale-[1.01]"
            style={{
              background: `${a.color}08`,
              borderColor: `${a.color}25`,
            }}
          >
            <span className="text-xl flex-shrink-0">{a.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{a.label}</p>
              <p className="text-xs text-white/40 truncate">{a.sub}</p>
            </div>
            <ArrowRight size={14} style={{ color: `${a.color}80`, flexShrink: 0 }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── ACHIEVEMENTS ───────────────────────────────────────────
function AchievementsSection({ achievements }) {
  const unlocked = achievements.filter(a => a.unlocked);
  const locked   = achievements.filter(a => !a.unlocked);

  return (
    <div className="p-5 rounded-[16px]" style={glass("#F59E0B")}>
      <SectionLabel icon={Trophy} label="Achievements" color="#F59E0B" />

      {/* Unlocked count */}
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl font-bold text-white">{unlocked.length}</span>
        <span className="text-sm text-white/40">/ {achievements.length} unlocked</span>
        <div className="flex-1 ml-2">
          <Bar pct={(unlocked.length / achievements.length) * 100} color="#F59E0B" height={4} />
        </div>
      </div>

      {/* Unlocked badges */}
      {unlocked.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-white/30 mb-2 uppercase tracking-wider">Earned</p>
          <div className="grid grid-cols-2 gap-2">
            {unlocked.map(ach => (
              <div key={ach.id}
                className="flex items-center gap-2.5 p-2.5 rounded-[10px]"
                style={{ background: "rgba(245,158,11,0.10)", border: "1px solid rgba(245,158,11,0.22)" }}>
                <span className="text-xl flex-shrink-0">{ach.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{ach.label}</p>
                  <p className="text-xs text-white/35 truncate" style={{ fontSize: "10px" }}>
                    {ach.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Locked badges */}
      {locked.length > 0 && (
        <div>
          <p className="text-xs text-white/30 mb-2 uppercase tracking-wider">Locked</p>
          <div className="grid grid-cols-2 gap-2">
            {locked.map(ach => (
              <div key={ach.id}
                className="flex items-center gap-2.5 p-2.5 rounded-[10px]"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <span className="text-xl flex-shrink-0 grayscale opacity-40">{ach.emoji}</span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white/40 truncate">{ach.label}</p>
                  <p className="text-xs text-white/20 truncate" style={{ fontSize: "10px" }}>
                    {ach.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Empty / Loading states ─────────────────────────────────
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <div className="text-5xl">📊</div>
      <div className="text-center">
        <p className="text-white font-semibold text-base mb-1">No activity yet</p>
        <p className="text-white/40 text-sm">
          Start learning on the Roadmap or practice questions to see your progress here!
        </p>
      </div>
    </div>
  );
}

// ── MAIN PROGRESS PAGE ─────────────────────────────────────
export default function Progress() {
  const navigate = useNavigate();
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const d = await getProgressOverview();
        setData(d);
      } catch (err) {
        console.error(err);
        setError("Failed to load progress data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const isEmpty = data && data.roadmap.total === 0 && data.practice.solved === 0;

  return (
    <div className="min-h-screen font-['Inter'] flex flex-col"
      style={{ background: "radial-gradient(ellipse at 20% 0%, #1a0a3c 0%, #0F0F1A 45%, #080d1a 100%)" }}>

      {/* Background glow blobs */}
      <div className="fixed top-0 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "rgba(108,62,244,0.07)", filter: "blur(100px)", zIndex: 0 }} />
      <div className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "rgba(59,139,255,0.05)", filter: "blur(80px)", zIndex: 0 }} />
      <div className="fixed top-1/2 left-0 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "rgba(255,107,53,0.04)", filter: "blur(70px)", zIndex: 0 }} />

      <div className="relative z-10 flex flex-col flex-1 overflow-hidden">
        <DashboardNavbar user={data?.user} />

        <div className="flex flex-1 overflow-hidden">
          <Sidebar />

          <main className="flex-1 overflow-y-auto">
            {/* ── Page header ── */}
            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Your{" "}
                  <span style={{
                    backgroundImage: GRAD,
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}>Progress</span>
                </h1>
                <p className="text-xs text-white/35 mt-1">Track your learning journey</p>
              </div>
            </div>

            {/* ── Loading ── */}
            {loading && (
              <div className="flex items-center justify-center py-24">
                <div className="text-center">
                  <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/60 animate-spin mx-auto mb-3" />
                  <p className="text-white/40 text-sm">Loading your progress...</p>
                </div>
              </div>
            )}

            {/* ── Error ── */}
            {!loading && error && (
              <div className="px-6 py-4">
                <div className="p-4 rounded-[12px] border" style={{ background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.2)" }}>
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            )}

            {/* ── Empty ── */}
            {!loading && !error && isEmpty && (
              <div className="px-6">
                <EmptyState />
                <div className="flex gap-3 justify-center">
                  <button onClick={() => navigate("/roadmap")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white"
                    style={{ backgroundImage: GRAD }}>
                    Start Roadmap <ChevronRight size={14} />
                  </button>
                  <button onClick={() => navigate("/practice")}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] text-sm font-semibold text-white border border-white/10 hover:bg-white/5 transition">
                    Practice <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* ── Main content ── */}
            {!loading && !error && data && !isEmpty && (
              <div className="px-6 pb-8 mt-4">
                {/* Two-column layout on large screens */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                  {/* ── LEFT COLUMN ── */}
                  <div className="lg:col-span-2 space-y-5">

                    {/* HERO */}
                    <HeroSection roadmap={data.roadmap} user={data.user} />

                    {/* WEEKLY GRAPH */}
                    <WeeklyGraph weeklyGraph={data.weeklyGraph} />

                    {/* TOPIC BREAKDOWN */}
                    <TopicsSection topicsPracticed={data.topicsPracticed} />

                    {/* ACHIEVEMENTS */}
                    <AchievementsSection achievements={data.achievements} />
                  </div>

                  {/* ── RIGHT COLUMN ── */}
                  <div className="space-y-5">

                    {/* STREAK */}
                    <StreakSection streak={data.streak} />

                    {/* STATS GRID */}
                    <StatsSection
                      roadmap={data.roadmap}
                      practice={data.practice}
                      accuracy={data.accuracy}
                      topicsPracticed={data.topicsPracticed}
                    />

                    {/* WEAK AREAS */}
                    <WeakAreasSection weakAreas={data.weakAreas} />

                    {/* NEXT ACTIONS */}
                    <NextActionSection
                      roadmap={data.roadmap}
                      weakAreas={data.weakAreas}
                      navigate={navigate}
                    />
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}