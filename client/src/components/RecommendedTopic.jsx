import { useNavigate } from "react-router-dom";

export default function RecommendedTopic({ topic, currentPath, path = "/roadmap" }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-[14px] p-5 border border-[#6C3EF4]/30 bg-[#6C3EF4]/5">
      <p className="text-xs font-semibold uppercase tracking-widest text-[#6C3EF4] mb-2">
        🧠 Recommended Next
      </p>
      <h3 className="text-base font-semibold dark:text-white text-gray-800 mb-1">
        {topic || "JavaScript Arrays"}
      </h3>
      <p className="text-xs dark:text-white/40 text-gray-400 mb-4">
        Based on your current progress in {currentPath || "Full Stack"}
      </p>
      <button
        onClick={() => navigate(path)}
        className="text-sm font-semibold px-4 py-2 rounded-[10px] text-white hover:opacity-90 transition"
        style={{ backgroundImage: 'linear-gradient(135deg, #6C3EF4, #3B8BFF)' }}
      >
        Start Topic →
      </button>
    </div>
  );
}