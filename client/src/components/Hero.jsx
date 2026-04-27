export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-6 pt-24 pb-16">
      
      <div className="inline-block text-xs font-semibold uppercase tracking-widest text-[#6C3EF4] bg-[#6C3EF4]/10 px-4 py-1.5 rounded-full mb-6">
        Your Career Starts Here
      </div>

      <h1
        className="text-5xl font-bold leading-tight tracking-tight max-w-3xl"
        style={{ color: "white" }}
      >
        Become{" "}
        <span
          style={{
            display: "inline",
            backgroundImage:
              "linear-gradient(135deg, #6C3EF4 0%, #3B8BFF 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          }}
        >
          Job-Ready
        </span>
        <span style={{ color: "white" }}>, Step by Step</span>
      </h1>

      <p className="mt-5 text-white/50 text-base max-w-xl leading-relaxed">
        CareerForge gives you a structured roadmap, daily tasks, and interview prep —
        everything you need to land your first dev job.
      </p>

      <div className="flex gap-4 mt-8">
        
        {/* ✅ FIXED BUTTON 1 */}
        <a
          href="/login"
          className="px-6 py-3 rounded-[10px] text-white font-semibold text-sm hover:opacity-90 transition cursor-pointer"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #6C3EF4 0%, #3B8BFF 100%)",
          }}
        >
          Start Your Journey
        </a>

        {/* BUTTON 2 */}
        <a
          href="#explore"
          className="px-6 py-3 rounded-[10px] font-semibold text-sm hover:opacity-80 transition"
          style={{
            border: "1.5px solid #6C3EF4",
            color: "#6C3EF4",
          }}
        >
          Explore Roadmap
        </a>

      </div>
    </section>
  );
}