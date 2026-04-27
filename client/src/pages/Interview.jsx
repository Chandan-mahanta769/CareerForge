import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Users, Code, Mic, Brain } from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import { getUserProfile } from "../services/api";
import { glassCardStyle, dashboardAuroraBackground } from "../utils/uiTheme";

const cards = [
  {
    title: "Viva Questions",
    desc: "Subject-Based Oral Exam Questions For Jobs",
    path: "viva",
    icon: Mic,
    color: "#10B981",
    badge: "Core Concepts",
    count: "80+ Questions",
  },
  {
    title: "Technical Questions",
    desc: "DSA, System Design & Language-Specific Questions",
    path: "technical",
    icon: Code,
    color: "#3B8BFF",
    badge: "Important",
    count: "100+ Questions",
  },
  {
    title: "Mock Interview",
    desc: "Random questions with timer — simulate a real interview",
    path: "mock",
    icon: Brain,
    color: "#FF6B35",
    badge: "🔥 Recommended",
    count: "Timed Mode",
  },
  {
    title: "HR Questions",
    desc: "Behavioral & Situational Questions Asked by Recruiters",
    path: "hr",
    icon: Users,
    color: "#6C3EF4",
    badge: "Most Asked",
    count: "50+ Questions",
  },
  
];

export default function InterviewPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    getUserProfile().then(setUser).catch(() => navigate("/login"));
  }, [navigate]);

  return (
    <div
      className="min-h-screen font-['Inter'] flex flex-col"
      style={{ background: dashboardAuroraBackground }}
    >
      <DashboardNavbar user={user} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto p-6">

          {/* Header */}
          <div className="mb-10">
            <div
              className="inline-block text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-4"
              style={{ background: "rgba(108,62,244,0.1)", color: "#6C3EF4" }}
            >
              Interview Prep
            </div>

            <h1 className="text-3xl font-bold dark:text-white text-gray-800 mb-2">
              Get{" "}
              <span
                style={{
                  backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Job Ready !
              </span>
            </h1>

            <p className="dark:text-white/40 text-gray-400 text-sm max-w-md">
              Practice HR, Technical, and Viva Questions — or Jump Into a Mock Interview With a Timer to Simulate the Real Experience.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
            {cards.map((card) => {
              const Icon = card.icon;
              const isHovered = hoveredCard === card.path;

              return (
                <div
                  key={card.path}
                  onClick={() => navigate(`/interview/${card.path}`)}
                  onMouseEnter={() => setHoveredCard(card.path)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="cursor-pointer p-6 group rounded-2xl transition-all duration-300"
                  style={{
                    ...glassCardStyle(card.color, isHovered),
                    transform: isHovered ? "scale(1.02)" : "scale(1)",
                    boxShadow: isHovered
                      ? `0 14px 42px ${card.color}30`
                      : `0 10px 30px ${card.color}18`,
                    border: `1px solid ${
                      isHovered ? card.color + "60" : card.color + "25"
                    }`,
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-[12px] flex items-center justify-center"
                      style={{
                        background: `${card.color}20`,
                        border: `1px solid ${card.color}30`,
                      }}
                    >
                      <Icon size={22} style={{ color: card.color }} />
                    </div>

                    <span
                      className="text-xs font-semibold px-2.5 py-1 rounded-full"
                      style={{
                        background: `${card.color}15`,
                        color: card.color,
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h2 className="text-base font-bold dark:text-white text-gray-800 mb-1">
                    {card.title}
                  </h2>

                  <p className="text-xs dark:text-white/40 text-gray-500 mb-4">
                    {card.desc}
                  </p>

                  <div className="flex items-center justify-between">
                    <span
                      className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: `${card.color}10`,
                        color: card.color,
                        border: `1px solid ${card.color}20`,
                      }}
                    >
                      {card.count}
                    </span>

                    <span
                      className="text-xs font-semibold"
                      style={{
                        color: card.color,
                        transform: isHovered
                          ? "translateX(4px)"
                          : "translateX(0)",
                      }}
                    >
                      Start →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </main>
      </div>
    </div>
  );
}