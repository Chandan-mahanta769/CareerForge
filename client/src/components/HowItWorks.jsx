const steps = [
  { num: '01', title: 'Choose Your Path', desc: 'Pick Full Stack, AI, or Cloud — based on your goal.' },
  { num: '02', title: 'Learn Step by Step', desc: 'Follow a structured roadmap with videos, notes & quizzes.' },
  { num: '03', title: 'Get Job Ready', desc: 'Practice coding, HR prep, and mock interviews — all in one place.' },
]

export default function HowItWorks() {
  return (
    <section id="how" className="px-6 py-16 max-w-4xl mx-auto">
      <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 text-center">Process</p>
      <h2 className="text-2xl font-semibold text-white text-center mb-10">How It Works</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {steps.map((s) => (
          <div key={s.num} className="bg-white/[0.03] border border-white/[0.06] rounded-[14px] p-6">
            <div className="text-3xl font-bold bg-gradient-to-r from-[#6C3EF4] to-[#3B8BFF] bg-clip-text text-transparent mb-4">
              {s.num}
            </div>
            <div className="text-white font-semibold text-sm mb-2">{s.title}</div>
            <div className="text-white/40 text-xs leading-relaxed">{s.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}