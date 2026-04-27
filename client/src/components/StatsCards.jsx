export default function StatsCards({ stats }) {
  const streak = stats?.streak ?? 0;
  const progress = stats?.progressPercent ?? 0;
  const solved = stats?.questionsSolved ?? 0;
  const dots = Array.from({ length: 7 }, (_, i) => i < streak % 7);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Progress Card */}
      <div
        className="rounded-[14px] p-5 text-white"
        style={{ backgroundImage: 'linear-gradient(135deg, #6C3EF4, #3B8BFF)' }}
      >
        <p className="text-xs text-white/70 mb-1">Overall Progress</p>
        <p className="text-3xl font-bold">{progress}%</p>
        <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Streak Card */}
      <div className="rounded-[14px] p-5 border border-white/10 dark:bg-white/[0.03] bg-white">
        <p className="text-xs dark:text-white/50 text-gray-400 mb-1">Daily Streak</p>
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-bold" style={{ color: '#FF6B35' }}>{streak}</span>
          <span className="text-sm dark:text-white/40 text-gray-400">days</span>
        </div>
        <div className="flex gap-1.5 mt-3">
          {dots.map((active, i) => (
            <div
              key={i}
              className="w-6 h-6 rounded-[6px]"
              style={{ background: active ? '#FF6B35' : 'rgba(255,255,255,0.08)' }}
            />
          ))}
        </div>
      </div>

      {/* Questions Solved */}
      <div className="rounded-[14px] p-5 border border-white/10 dark:bg-white/[0.03] bg-white">
        <p className="text-xs dark:text-white/50 text-gray-400 mb-1">Questions Solved</p>
        <p className="text-3xl font-bold" style={{ color: '#10B981' }}>{solved}</p>
        <p className="text-xs dark:text-white/30 text-gray-400 mt-2">Keep going! 💪</p>
      </div>
    </div>
  );
}