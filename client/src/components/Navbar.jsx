export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-white/10">
      
      {/* Logo - LEFT */}
      <a
        href="/"
        style={{
          backgroundImage:
            "linear-gradient(135deg, #6C3EF4 0%, #3B8BFF 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          WebkitTextFillColor: "transparent",
          color: "transparent",
          fontSize: "20px",
          fontWeight: "700",
          textDecoration: "none",
        }}
      >
        CareerForge
      </a>

      {/* Links - RIGHT */}
      <div className="flex items-center gap-6">
        
        <a
          href="#how"
          className="text-sm text-white/60 hover:text-white transition"
        >
          How it Works
        </a>

        <a
          href="#why"
          className="text-sm text-white/60 hover:text-white transition"
        >
          Why Us
        </a>

        <a
          href="/login"
          className="text-sm text-white/60 hover:text-white transition"
        >
          Login
        </a>

        
        <a
          href="/signup"
          className="text-sm font-semibold px-4 py-2 rounded-[10px] text-white hover:opacity-90 transition"
          style={{
            backgroundImage:
              "linear-gradient(135deg, #6C3EF4 0%, #3B8BFF 100%)",
          }}
        >
          Get Started
        </a>

      </div>
    </nav>
  );
}