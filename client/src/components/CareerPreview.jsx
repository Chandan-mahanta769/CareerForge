import { Link } from "react-router-dom"; 

const paths = [
  { name: 'Full Stack', icon: '⚡', desc: 'MERN · Java · Python', active: true },
  { name: 'AI / ML', icon: '🤖', desc: 'Coming Soon', active: false },
  { name: 'Cloud & DevOps', icon: '☁️', desc: 'Coming Soon', active: false },
  { name: 'Data Science & Analytics', icon: '☁️', desc: 'Coming Soon', active: false },
  { name: 'Blockchain & Web3', icon: '☁️', desc: 'Coming Soon', active: false },
  { name: 'Mobile App Development', icon: '☁️', desc: 'Coming Soon', active: false },
]

export default function CareerPreview() {
  return (
    <section id="explore" className="px-6 py-16 max-w-4xl mx-auto">
      
      <Link to="/explore" className="mt-4 text-xs font-semibold text-[#6C3EF4]">
        Explore Our Page → 
      </Link>

      <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-3 text-center">
        Career Paths
      </p>

      <h2 className="text-2xl font-semibold text-white text-center mb-10">
        Choose Your Track
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {paths.map((p) => (
          <div
            key={p.name}
            className={`relative rounded-[14px] p-5 border transition
              ${p.active
                ? 'border-[#6C3EF4]/50 bg-[#6C3EF4]/10 cursor-pointer hover:bg-[#6C3EF4]/15'
                : 'border-white/5 bg-white/[0.03] opacity-50 cursor-not-allowed'
              }`}
          >
            {!p.active && (
              <span className="absolute top-3 right-3 text-xs bg-white/10 text-white/40 px-2 py-0.5 rounded-full">
                🔒 Locked
              </span>
            )}

            <div className="text-2xl mb-3">{p.icon}</div>
            <div className="text-white font-semibold text-sm">{p.name}</div>
            <div className="text-white/40 text-xs mt-1">{p.desc}</div>

            {p.active && (
              <div className="mt-4 text-xs font-semibold text-[#6C3EF4]">
                Explore → 
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}