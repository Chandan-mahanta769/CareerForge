import { Link } from "react-router-dom";

const roadmap = [
  {
    id: 1,
    title: "HTML",
    icon: "H",
    color: "#10B981",
    topics: ["HTML Structure", "Forms", "Semantic HTML", "Accessibility"],
    locked: false,
  },
  {
    id: 2,
    title: "CSS",
    icon: "C",
    color: "#10B981",
    topics: ["Flexbox", "Grid", "Animations", "Responsive Design"],
    locked: false,
  },
  {
    id: 3,
    title: "JavaScript",
    icon: "JS",
    color: "#6C3EF4",
    topics: ["Arrays", "Functions", "DOM", "Async/Await"],
    locked: false,
  },
  {
    id: 4,
    title: "React",
    icon: "R",
    color: "#3B8BFF",
    topics: ["Components", "Hooks", "State", "React Router"],
    locked: true,
  },
  {
    id: 5,
    title: "Backend (Node/Express)",
    icon: "N",
    color: "#3B8BFF",
    topics: ["REST APIs", "Middleware", "Auth", "Error Handling"],
    locked: true,
  },
  {
    id: 6,
    title: "Database (MongoDB)",
    icon: "DB",
    color: "#3B8BFF",
    topics: ["Schema Design", "CRUD", "Aggregation", "Indexing"],
    locked: true,
  },
];

const sampleQuestions = [
  { q: "What is the difference between == and === in JavaScript?", locked: false },
  { q: "Explain the CSS Box Model.", locked: false },
  { q: "What is a closure in JavaScript?", locked: true },
  { q: "How does useEffect work in React?", locked: true },
];

export default function ExplorePage() {
  const token = localStorage.getItem("token");

  return (
    <div className="min-h-screen dark:bg-[#0F0F1A] bg-gray-100 font-['Inter']">

      {/* Navbar */}
      <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10 dark:bg-[#0F0F1A] bg-white">
        <Link
          to="/"
          style={{
            backgroundImage: 'linear-gradient(135deg, #6C3EF4 0%, #3B8BFF 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: 'transparent',
            fontSize: '20px',
            fontWeight: '700',
            textDecoration: 'none',
          }}
        >
          CareerForge
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm dark:text-white/50 text-gray-500 hover:text-[#6C3EF4] transition">
            Home
          </Link>
          {token ? (
            <Link
              to="/dashboard"
              className="text-sm font-semibold px-4 py-2 rounded-[10px] text-white hover:opacity-90 transition"
              style={{ backgroundImage: 'linear-gradient(135deg, #6C3EF4, #3B8BFF)' }}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold px-4 py-2 rounded-[10px] text-white hover:opacity-90 transition"
              style={{ backgroundImage: 'linear-gradient(135deg, #6C3EF4, #3B8BFF)' }}
            >
              Login to Unlock
            </Link>
          )}
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#6C3EF4] bg-[#6C3EF4]/10 px-4 py-1.5 rounded-full mb-4">
            Guest Preview
          </div>
          <h1 className="text-3xl font-bold dark:text-white text-gray-800 mb-3">
            Full Stack Roadmap
          </h1>
          <p className="dark:text-white/40 text-gray-400 text-sm max-w-md mx-auto">
            Preview the learning path. Login to unlock all topics, track progress, and start learning.
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-white/10 dark:bg-white/10 bg-gray-200" />

          <div className="flex flex-col gap-4">
            {roadmap.map((step, index) => (
              <div key={step.id} className="relative flex gap-5">
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-[10px] flex items-center justify-center text-xs font-bold flex-shrink-0 z-10"
                  style={{
                    background: step.locked ? 'rgba(255,255,255,0.05)' : `${step.color}20`,
                    color: step.locked ? '#555' : step.color,
                    border: `1px solid ${step.locked ? 'rgba(255,255,255,0.05)' : step.color + '40'}`,
                  }}
                >
                  {step.locked ? "🔒" : step.icon}
                </div>

                {/* Card */}
                <div
                  className="flex-1 rounded-[14px] p-5 border transition mb-2"
                  style={{
                    background: step.locked ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.03)',
                    borderColor: step.locked ? 'rgba(255,255,255,0.05)' : `${step.color}30`,
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <h3
                        className="font-semibold text-sm"
                        style={{ color: step.locked ? '#555' : 'inherit' }}
                      >
                        <span className={step.locked ? 'text-gray-500 dark:text-white/20' : 'dark:text-white text-gray-800'}>
                          {step.title}
                        </span>
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-semibold"
                        style={step.locked
                          ? { background: 'rgba(255,255,255,0.05)', color: '#666' }
                          : { background: `${step.color}15`, color: step.color }
                        }
                      >
                        {index < 2 ? "Preview" : index === 2 ? "Preview" : "Locked"}
                      </span>
                    </div>
                    <span className="text-xs dark:text-white/20 text-gray-400">
                      {step.topics.length} topics
                    </span>
                  </div>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {step.topics.map((topic, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full"
                        style={step.locked
                          ? {
                              background: 'rgba(255,255,255,0.03)',
                              color: 'transparent',
                              border: '1px dashed rgba(255,255,255,0.08)',
                              userSelect: 'none',
                              filter: 'blur(4px)',
                            }
                          : {
                              background: `${step.color}10`,
                              color: step.color,
                              border: `1px solid ${step.color}20`,
                            }
                        }
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sample Questions */}
        <div className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-widest dark:text-white/30 text-gray-400 mb-4">
            Sample Practice Questions
          </p>
          <div className="flex flex-col gap-3">
            {sampleQuestions.map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-[12px] border flex items-center justify-between gap-4"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  borderColor: 'rgba(255,255,255,0.06)',
                }}
              >
                <p
                  className="text-sm"
                  style={item.locked ? {
                    filter: 'blur(5px)',
                    userSelect: 'none',
                    color: '#666',
                  } : {
                    color: 'inherit',
                  }}
                  className={`text-sm ${item.locked ? '' : 'dark:text-white/70 text-gray-600'}`}
                >
                  {item.q}
                </p>
                {item.locked && (
                  <span className="text-xs flex-shrink-0 dark:text-white/20 text-gray-400">🔒</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <div
          className="mt-12 rounded-[16px] p-8 text-center"
          style={{ backgroundImage: 'linear-gradient(135deg, #6C3EF4, #3B8BFF)' }}
        >
          <h2 className="text-xl font-bold text-white mb-2">
            Ready to Start Learning?
          </h2>
          <p className="text-white/70 text-sm mb-6">
            Create a free account to unlock all topics, track your progress, and get job-ready.
          </p>
          <div className="flex gap-3 justify-center">
            <Link
              to="/login"
              className="px-6 py-3 rounded-[10px] bg-white font-semibold text-sm hover:opacity-90 transition"
              style={{ color: '#6C3EF4' }}
            >
              Login to Unlock
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 rounded-[10px] font-semibold text-sm text-white border border-white/30 hover:bg-white/10 transition"
            >
              Sign Up Free
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}