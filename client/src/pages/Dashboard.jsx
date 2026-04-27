import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getUserStats, getUserProfile } from "../services/api";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import StatsCards from "../components/StatsCards";
import TodayTasks from "../components/TodayTasks";
import RecommendedTopic from "../components/RecommendedTopic";
import Random from "../components/Random";
import { roadmapData } from "../data/roadmapData";
import { getQuestionsByType } from "../utils/questionLoader";
import { technicalQuestions } from "../data/technicalQuestions";
import { vivaQuestions } from "../data/vivaQuestions";
import { hrQuestions } from "../data/hrQuestions";
import { mockQuestions } from "../data/mockQuestions";

const PRACTICE_TOPICS = ["html", "css", "js", "react", "node", "mongodb", "dsa"];

const getPracticeTotal = () =>
    PRACTICE_TOPICS.reduce((sum, topic) => {
        const group = getQuestionsByType(topic);
        return sum + Object.values(group || {}).reduce((count, list) => count + (list?.length || 0), 0);
    }, 0);

const getRoadmapTotalSteps = () =>
    roadmapData
        .filter((cat) => !cat.locked)
        .flatMap((cat) => cat.tracks || [])
        .filter((track) => !track.locked)
        .flatMap((track) => track.stacks || [])
        .filter((stack) => !stack.locked)
        .reduce((sum, stack) => sum + (stack.steps?.length || 0), 0);

export default function DashboardPage() {
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            const [profile, statsData] = await Promise.all([
                getUserProfile(),
                getUserStats(),
            ]);

            setUser(profile);
            setStats(statsData);
        } catch (err) {
            console.error(err); // ✅ debugging
            localStorage.removeItem("token");
            navigate("/");
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    // ✅ Proper useEffect
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // ✅ Loading UI
    if (loading) {
        return (
            <div className="min-h-screen dark:bg-[#0F0F1A] bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div
                        className="text-2xl font-bold mb-2"
                        style={{
                            backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)",
                            WebkitBackgroundClip: "text",
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        CareerForge
                    </div>
                    <p className="dark:text-white/40 text-gray-400 text-sm">
                        Loading your dashboard...
                    </p>
                </div>
            </div>
        );
    }

    const practiceTotal = getPracticeTotal();
    const interviewTotal = technicalQuestions.length + vivaQuestions.length + hrQuestions.length + mockQuestions.length;
    const roadmapTotal = getRoadmapTotalSteps();
    const donePractice = stats?.practiceSolvedCount || 0;
    const doneInterview = stats?.interviewSolvedCount || 0;
    const doneRoadmap = stats?.roadmapCompletedSteps || 0;
    const totalUniverse = practiceTotal + interviewTotal + roadmapTotal;
    const overallProgress = totalUniverse
        ? Math.min(100, Math.round(((donePractice + doneInterview + doneRoadmap) / totalUniverse) * 100))
        : 0;

    const studiedToday =
        stats?.lastStudied &&
        new Date(stats.lastStudied).toDateString() ===
        new Date().toDateString();

    return (
        <div className="min-h-screen dark:bg-[#0F0F1A] bg-gray-100 font-['Inter'] flex flex-col">

            <DashboardNavbar user={user} />

            <div className="flex flex-1 overflow-hidden">
                <Sidebar />

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto p-6">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold dark:text-white text-gray-800">
                            Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
                        </h1>

                        <p className="text-sm dark:text-white/40 text-gray-400 mt-1">
                            {studiedToday
                                ? "Great job studying today! Keep it up 🔥"
                                : "⚠️ You haven't studied today — let's fix that!"}
                        </p>
                    </div>

                    {/* Stats */}
                    <StatsCards
                        stats={{
                            ...stats,
                            progressPercent: overallProgress,
                            questionsSolved: donePractice + doneInterview,
                        }}
                    />

                    {/* Continue Learning */}
                    <div className="mt-6 rounded-[14px] p-5 border border-white/10 dark:bg-white/[0.03] bg-white flex items-center justify-between">
                        <div>
                            <p className="text-xs dark:text-white/40 text-gray-400 mb-1">
                                Continue From Yesterday
                            </p>

                            <p className="text-base font-semibold dark:text-white text-gray-800">
                                {stats?.lastStudyContext?.label || "Pick up your pending roadmap step"}
                            </p>

                            <p className="text-xs dark:text-white/30 text-gray-400 mt-0.5">
                                {stats?.lastStudyContext?.type || "learning"}
                            </p>
                        </div>

                        <button
                            onClick={() => navigate(stats?.lastStudyContext?.path || "/roadmap")}
                            className="px-5 py-2.5 rounded-[10px] text-white font-semibold text-sm hover:opacity-90 transition"
                            style={{
                                backgroundImage:
                                    "linear-gradient(135deg, #6C3EF4, #3B8BFF)",
                            }}
                        >
                            ▶ Continue
                        </button>
                    </div>

                    {/* Tasks + Recommended */}
                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">

                        <TodayTasks
                            tasks={stats?.todayTasks || []} // ✅ prevent crash
                            onUpdate={fetchData}
                        />

                        <RecommendedTopic
                            topic={stats?.recommendedTopic}
                            currentPath={stats?.currentPath}
                            path={stats?.lastStudyContext?.type === "interview" ? "/interview" : "/roadmap"}
                        />
                    </div>

                    <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <Random />
                        <div className="rounded-[14px] p-5 border border-white/10 dark:bg-white/[0.03] bg-white">
                            <h3 className="text-sm font-semibold dark:text-white text-gray-800 mb-3">
                                📊 Real Learning Breakdown
                            </h3>
                            <div className="space-y-3 text-sm">
                                <p className="dark:text-white/70 text-gray-700">
                                    Practice solved: <span className="font-semibold">{donePractice}</span> / {practiceTotal}
                                </p>
                                <p className="dark:text-white/70 text-gray-700">
                                    Interview solved: <span className="font-semibold">{doneInterview}</span> / {interviewTotal}
                                </p>
                                <p className="dark:text-white/70 text-gray-700">
                                    Roadmap steps completed: <span className="font-semibold">{doneRoadmap}</span> / {roadmapTotal}
                                </p>
                            </div>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}