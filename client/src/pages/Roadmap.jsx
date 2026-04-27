import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import { getUserProfile, getStackProgress, updateStepProgress, getCourses } from "../services/api";
import { dashboardAuroraBackground } from "../utils/uiTheme";

const glassCard = (color = "#6C3EF4", active = false) => ({
  background: active
    ? `linear-gradient(135deg, ${color}22, rgba(255,255,255,0.08))`
    : "linear-gradient(145deg, rgba(255,255,255,0.09), rgba(255,255,255,0.03))",
  border: `1px solid ${active ? color + "55" : "rgba(255,255,255,0.1)"}`,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: active ? `0 16px 44px ${color}28` : "0 10px 30px rgba(2,8,23,0.24)",
  borderRadius: "16px",
  transition: "all 0.3s ease",
});

function CategoryCard({ cat, selected, onClick }) {
  return (
    <div
      onClick={() => !cat.locked && onClick(cat)}
      className="p-6 cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 group"
      style={glassCard(cat.color, selected)}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-3xl w-12 h-12 rounded-xl flex items-center justify-center border"
          style={{
            background: `${cat.color}20`,
            borderColor: `${cat.color}55`,
            boxShadow: `0 0 20px ${cat.color}30`,
          }}
        >
          {cat.icon}
        </span>
        {cat.locked && <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/30 border border-white/10">🔒 Soon</span>}
        {selected && !cat.locked && <span className="text-xs px-2 py-1 rounded-full font-semibold" style={{ background: `${cat.color}20`, color: cat.color }}>Selected</span>}
      </div>
      <h3 className="font-bold text-base mb-1 group-hover:text-white" style={{ color: cat.locked ? "#444" : "rgba(255,255,255,0.95)" }}>{cat.title}</h3>
      <p className="text-xs text-white/45">{cat.tracks?.length || 0} tracks</p>
      {cat.locked && <p className="text-xs text-white/20 mt-1">Coming soon</p>}
    </div>
  );
}

function TrackCard({ track, selected, onClick }) {
  return (
    <div
      onClick={() => !track.locked && onClick(track)}
      className="p-5 cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
      style={glassCard("#6C3EF4", selected)}
    >
      <span className="text-2xl mb-3 block w-11 h-11 rounded-xl border border-[#6C3EF4]/40 bg-[#6C3EF4]/15 flex items-center justify-center shadow-[0_0_20px_rgba(108,62,244,0.25)]">
        {track.icon}
      </span>
      <h4 className="font-semibold text-white text-sm mb-1">{track.title}</h4>
      <p className="text-xs text-white/50">{track.desc}</p>
      <p className="text-xs text-white/20 mt-2">{track.stacks?.length} stacks</p>
    </div>
  );
}

function StackCard({ stack, selected, onClick }) {
  const diffColor = { Beginner: "#10B981", Intermediate: "#F59E0B", Advanced: "#FF6B35" }[stack.difficulty] || "#6C3EF4";
  return (
    <div
      onClick={() => !stack.locked && onClick(stack)}
      className="p-5 cursor-pointer hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300"
      style={glassCard(diffColor, selected)}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-2xl w-11 h-11 rounded-xl flex items-center justify-center border"
          style={{
            background: `${diffColor}18`,
            borderColor: `${diffColor}55`,
            boxShadow: `0 0 18px ${diffColor}30`,
          }}
        >
          {stack.icon}
        </span>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: `${diffColor}20`, color: diffColor }}>{stack.difficulty}</span>
      </div>
      <h4 className="font-semibold text-white text-sm mb-1">{stack.title}</h4>
      <p className="text-xs text-white/40">⏱ {stack.duration}</p>
      <p className="text-xs text-white/20 mt-1">{stack.steps?.length} steps</p>
    </div>
  );
}

// ✅ navigate comes as PROP — no useNavigate inside here
function RoadmapTimeline({ stack, categoryId, trackId, onBack, navigate }) {
  const [completedSteps, setCompletedSteps] = useState({});
  const [loading, setLoading] = useState(true);
  const [expandedStep, setExpandedStep] = useState(null);
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const data = await getStackProgress(categoryId, trackId, stack.id);
        const map = {};
        (data.steps || []).forEach((s) => { map[s.stepId] = s.completed; });
        setCompletedSteps(map);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchProgress();
  }, [stack.id, categoryId, trackId]);

  // ✅ e.stopPropagation() stops card from collapsing
  const toggleStep = async (e, stepId) => {
    e.stopPropagation();
    setUpdating(stepId);
    const newVal = !completedSteps[stepId];
    try {
      await updateStepProgress(categoryId, trackId, stack.id, stepId, newVal);
      setCompletedSteps((prev) => ({ ...prev, [stepId]: newVal }));
    } catch (err) { console.error(err); }
    setUpdating(null);
  };

  // ✅ navigates to topic page
  const openTopic = (e, stepId) => {
    e.stopPropagation();
    navigate(`/topic/${categoryId}/${trackId}/${stack.id}/${stepId}`, {
      state: {
        fromPath: "/roadmap",
        fromLabel: `${stack.title} roadmap`,
      },
    });
  };

  // ✅ card header only expands/collapses
  const toggleExpand = (stepId) => {
    setExpandedStep((prev) => (prev === stepId ? null : stepId));
  };

  const completedCount = Object.values(completedSteps).filter(Boolean).length;
  const totalSteps = stack.steps.length;
  const percent = totalSteps ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={onBack} className="text-white/60 hover:text-white transition text-sm px-3 py-1.5 rounded-[10px] border border-white/15 hover:border-white/30 bg-white/5">← Back</button>
        <div>
          <h2 className="text-lg font-bold text-white">{stack.title}</h2>
          <p className="text-xs text-white/50">{stack.duration} · {stack.difficulty}</p>
        </div>
      </div>

      <div className="p-4 rounded-[14px] mb-8 flex items-center gap-4 border" style={{ ...glassCard("#6C3EF4", true), borderColor: "rgba(108,62,244,0.45)" }}>
        <div className="flex-1">
          <div className="flex justify-between mb-2">
            <span className="text-xs text-white/50">Overall Progress</span>
            <span className="text-xs font-semibold text-[#C4B5FD]">{percent}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${percent}%`, backgroundImage: "linear-gradient(90deg, #6C3EF4, #3B8BFF)" }} />
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-2xl font-bold text-white">{completedCount}<span className="text-white/30 text-sm">/{totalSteps}</span></p>
          <p className="text-xs text-white/30">steps done</p>
        </div>
      </div>

      {loading ? (
        <div className="text-center text-white/30 text-sm py-8">Loading progress...</div>
      ) : (
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10" />
          <div className="flex flex-col gap-3">
            {stack.steps.map((step, index) => {
              const isCompleted = !!completedSteps[step.id];
              const isExpanded = expandedStep === step.id;
              const isPrevDone = index === 0 || !!completedSteps[stack.steps[index - 1].id];

              return (
                <div key={step.id} className="relative flex gap-5">
                  <div className="flex flex-col items-center z-10 flex-shrink-0">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300"
                      style={{
                        background: isCompleted ? step.color : "rgba(255,255,255,0.05)",
                        borderColor: isCompleted ? step.color : isPrevDone ? step.color + "60" : "rgba(255,255,255,0.1)",
                        color: isCompleted ? "white" : isPrevDone ? step.color : "#555",
                        boxShadow: isCompleted ? `0 0 16px ${step.color}60` : "none",
                      }}
                    >
                      {isCompleted ? "✓" : step.icon}
                    </div>
                  </div>

                  <div className="flex-1 mb-3 overflow-hidden" style={{ ...glassCard(step.color, isCompleted || isExpanded), boxShadow: isExpanded ? `0 14px 38px ${step.color}22` : glassCard(step.color, isCompleted || isExpanded).boxShadow }}>
                    {/* ✅ Header only toggles expand */}
                    <div className="flex items-center justify-between p-4 cursor-pointer select-none" onClick={() => toggleExpand(step.id)}>
                      <div>
                        <h4 className="font-semibold text-sm text-white">{step.title}</h4>
                        <p className="text-xs text-white/30">{step.topics.length} topics</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {isCompleted && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "#10B98120", color: "#10B981" }}>Done ✓</span>
                        )}
                        <span className="text-white/30 text-xs">{isExpanded ? "▲" : "▼"}</span>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-4 pb-4 border-t border-white/5 pt-3">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {step.topics.map((topic, i) => (
                            <span key={i} className="text-xs px-3 py-1 rounded-full" style={{ background: `${step.color}15`, color: step.color, border: `1px solid ${step.color}30` }}>
                              {topic}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {/* ✅ Open Topic navigates correctly */}
                          <button
                            onClick={(e) => openTopic(e, step.id)}
                            className="text-sm font-semibold px-4 py-2 rounded-[10px] text-white hover:opacity-90 transition border border-white/20"
                            style={{ backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)" }}
                          >
                            📚 Open Topic
                          </button>
                          <button
                            onClick={(e) => toggleStep(e, step.id)}
                            disabled={updating === step.id}
                            className="text-sm font-semibold px-4 py-2 rounded-[10px] text-white hover:opacity-90 transition border border-white/10"
                            style={{ backgroundImage: isCompleted ? "linear-gradient(135deg, #555, #333)" : "linear-gradient(135deg, #10B981, #059669)" }}
                          >
                            {updating === step.id ? "Updating..." : isCompleted ? "Mark Incomplete" : "Mark as Complete ✓"}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

const sortByOrderThenTitle = (items = []) =>
  [...items].sort((a, b) => {
    const ao = a.order ?? Number.MAX_SAFE_INTEGER;
    const bo = b.order ?? Number.MAX_SAFE_INTEGER;
    if (ao !== bo) return ao - bo;
    return String(a.title || "").localeCompare(String(b.title || ""));
  });

const withPreferredOrder = (items = [], preferredIds = []) => {
  const rank = new Map(preferredIds.map((id, idx) => [id, idx]));
  return [...items].sort((a, b) => {
    const ar = rank.has(a.id) ? rank.get(a.id) : Number.MAX_SAFE_INTEGER;
    const br = rank.has(b.id) ? rank.get(b.id) : Number.MAX_SAFE_INTEGER;
    if (ar !== br) return ar - br;
    return sortByOrderThenTitle([a, b])[0] === a ? -1 : 1;
  });
};

export default function RoadmapPage() {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedStack, setSelectedStack] = useState(null);
  const navigate = useNavigate(); // ✅ only here

  useEffect(() => {
    Promise.all([getUserProfile(), getCourses()])
      .then(([profile, coursesData]) => {
        setUser(profile);
        setCourses(Array.isArray(coursesData) ? coursesData : []);
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  const resetTo = (level) => {
    if (level === "category") { setSelectedCategory(null); setSelectedTrack(null); setSelectedStack(null); }
    else if (level === "track") { setSelectedTrack(null); setSelectedStack(null); }
    else if (level === "stack") { setSelectedStack(null); }
  };

  const orderedCategories = withPreferredOrder(
    sortByOrderThenTitle(courses),
    ["webdev", "cloud", "aiml"]
  );

  const orderedTracks = selectedCategory?.id === "webdev"
    ? withPreferredOrder(sortByOrderThenTitle(selectedCategory?.tracks || []), ["fullstack", "frontend", "backend"])
    : sortByOrderThenTitle(selectedCategory?.tracks || []);

  const orderedStacks = selectedTrack?.id === "fullstack"
    ? withPreferredOrder(sortByOrderThenTitle(selectedTrack?.stacks || []), ["mern", "java-fullstack", "python-fullstack"])
    : selectedTrack?.id === "frontend"
      ? withPreferredOrder(sortByOrderThenTitle(selectedTrack?.stacks || []), ["html-css-js", "frontend-dsa", "react-stack"])
      : selectedTrack?.id === "backend"
        ? withPreferredOrder(sortByOrderThenTitle(selectedTrack?.stacks || []), ["node-express", "java-backend"])
        : sortByOrderThenTitle(selectedTrack?.stacks || []);

  return (
    <div
      className="min-h-screen font-['Inter'] flex flex-col"
      style={{ background: dashboardAuroraBackground }}
    >
      <DashboardNavbar user={user} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">

          <div className="flex items-center gap-2 text-xs text-white/35 mb-6 flex-wrap rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2">
            <button onClick={() => resetTo("category")} className="hover:text-white transition">Roadmap</button>
            {selectedCategory && <><span>/</span><button onClick={() => resetTo("track")} className="hover:text-white transition">{selectedCategory.title}</button></>}
            {selectedTrack && <><span>/</span><button onClick={() => resetTo("stack")} className="hover:text-white transition">{selectedTrack.title}</button></>}
            {selectedStack && <><span>/</span><span className="text-white/70">{selectedStack.title}</span></>}
          </div>

          {!selectedCategory && (
            <>
              <h1 className="text-2xl font-bold text-white mb-2">Choose Your Path</h1>
              <p className="text-sm text-white/50 mb-6">Select a category to explore learning tracks</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {orderedCategories.map((cat) => <CategoryCard key={cat.id} cat={cat} selected={selectedCategory?.id === cat.id} onClick={setSelectedCategory} />)}
              </div>
            </>
          )}

          {selectedCategory && !selectedTrack && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => resetTo("category")} className="text-white/40 hover:text-white transition text-sm px-3 py-1.5 rounded-[8px] border border-white/10">← Back</button>
                <div>
                  <h1 className="text-2xl font-bold text-white">{selectedCategory.title}</h1>
                  <p className="text-sm text-white/40">Choose your track</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {orderedTracks.map((track) => <TrackCard key={track.id} track={track} selected={selectedTrack?.id === track.id} onClick={setSelectedTrack} />)}
              </div>
            </>
          )}

          {selectedTrack && !selectedStack && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <button onClick={() => resetTo("track")} className="text-white/40 hover:text-white transition text-sm px-3 py-1.5 rounded-[8px] border border-white/10">← Back</button>
                <div>
                  <h1 className="text-2xl font-bold text-white">{selectedTrack.title}</h1>
                  <p className="text-sm text-white/40">Choose your stack</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {orderedStacks.map((stack) => <StackCard key={stack.id} stack={stack} selected={selectedStack?.id === stack.id} onClick={setSelectedStack} />)}
              </div>
            </>
          )}

          {/* ✅ navigate passed as prop to RoadmapTimeline */}
          {selectedStack && (
            <RoadmapTimeline
              stack={selectedStack}
              categoryId={selectedCategory.id}
              trackId={selectedTrack.id}
              onBack={() => resetTo("stack")}
              navigate={navigate}
            />
          )}

        </main>
      </div>
    </div>
  );
}