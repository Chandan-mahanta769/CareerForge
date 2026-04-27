import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { technicalQuestions } from "../data/technicalQuestions";
import { vivaQuestions } from "../data/vivaQuestions";
import { mockQuestions } from "../data/mockQuestions";

const pickRandom = (items, count) => {
  const shuffled = [...items].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export default function Random() {
  const navigate = useNavigate();

  const randomQuestions = useMemo(() => {
    const interviewPool = [...technicalQuestions, ...vivaQuestions, ...mockQuestions]
      .filter((q) => q?.id)
      .map((q) => ({
        id: q.id,
        title: q.title || q.question || "Interview question",
        source: "Interview",
        path: "/interview/technical",
      }));
    return pickRandom(interviewPool, 3);
  }, []);

  return (
    <div className="rounded-[14px] p-5 border border-white/10 dark:bg-white/[0.03] bg-white">
      <h3 className="text-sm font-semibold dark:text-white text-gray-800 mb-4">
        🎲 Random Questions
      </h3>
      <div className="flex flex-col gap-3">
        {randomQuestions.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className="w-full text-left p-3 rounded-[10px] border border-white/5 dark:bg-white/[0.02] bg-gray-50 hover:border-[#6C3EF4]/40 transition"
          >
            <p className="text-xs text-[#6C3EF4] font-semibold mb-1">{item.source}</p>
            <p className="text-sm dark:text-white/85 text-gray-700">{item.title}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
