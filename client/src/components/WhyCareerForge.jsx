const reasons = [
  { icon: '🗺️', title: 'Structured Roadmap', desc: 'No more confusion — follow a proven path from zero to job-ready.' },
  { icon: '🔥', title: 'Daily Tracking', desc: 'Streak system keeps you consistent and motivated every day.' },
  { icon: '🎯', title: 'Interview-Focused', desc: 'Real HR questions, technical prep, and mock interview mode.' },
  { icon: '📊', title: 'Progress Analytics', desc: 'See exactly where you are and what needs your attention.' },
  { icon: '🏆', title: 'Gamification', desc: 'Earn badges and points as you hit milestones.' },
  { icon: '🧠', title: 'Smart Suggestions', desc: 'AI detects your weak areas and recommends what to study next.' },
]

export default function WhyCareerForge() {
  return (
    <section id="why" className="px-6 py-16 max-w-4xl mx-auto">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 text-center">Benefits</p>
      <h2 className="text-2xl font-semibold text-white text-center mb-10">Why CareerForge?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reasons.map((r) => (
          <div key={r.title} className="bg-white/[0.03] border border-white/[0.06] rounded-[14px] p-5 hover:border-[#6C3EF4]/30 hover:bg-[#6C3EF4]/5 transition">
            <div className="text-xl mb-3">{r.icon}</div>
            <div className="text-white font-semibold text-sm mb-1">{r.title}</div>
            <div className="text-white/40 text-xs leading-relaxed">{r.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}