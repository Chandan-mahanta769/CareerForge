import { useTheme } from "../context/ThemeContext";
import { useState, useEffect } from "react";
import { MoonStar, Sun } from "lucide-react";
import av1 from "../assets/avatars/avatar1.jpg";
import av2 from "../assets/avatars/avatar2.jpg";
import av3 from "../assets/avatars/avatar3.jpg";
import av4 from "../assets/avatars/avatar4.jpg";
import av5 from "../assets/avatars/avatar5.jpg";
import av6 from "../assets/avatars/avatar6.jpg";
import av7 from "../assets/avatars/avatar7.jpg";
import av8 from "../assets/avatars/avatar8.jpg";

const AVATAR_MAP = { avatar1: av1, avatar2: av2, avatar3: av3, avatar4: av4, avatar5: av5, avatar6: av6, avatar7: av7, avatar8: av8 };

export default function DashboardNavbar({ user }) {
  const { dark, setDark } = useTheme();
  const [avatarSrc, setAvatarSrc] = useState(() => user?.avatar ? AVATAR_MAP[user.avatar] || av1 : null);

  // update avatar whenever user prop changes or profileUpdated event fires
  useEffect(() => {
    if (user?.avatar) {
      setAvatarSrc(AVATAR_MAP[user.avatar] || av1);
    }
  }, [user]);

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem("cf_avatar_temp");
      if (stored && AVATAR_MAP[stored]) setAvatarSrc(AVATAR_MAP[stored]);
    };
    window.addEventListener("profileUpdated", handler);
    return () => window.removeEventListener("profileUpdated", handler);
  }, []);

  const initials = user?.name
    ? user.name.split(" ").map(n => n[0]).join("").toUpperCase()
    : "U";

  return (
    <header
      className="h-16 px-4 sm:px-6 flex items-center justify-between border-b sticky top-0 z-20"
      style={{
        borderColor: "rgba(255,255,255,0.1)",
        background: dark ? "rgba(15,15,26,0.72)" : "rgba(255,255,255,0.78)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <a
        href="/dashboard"
        className="text-xl font-bold tracking-tight flex items-center"
        style={{ textDecoration: "none" }}
      >
        {/* Career (gradient glow) */}
        <span
          style={{
            backgroundImage: "linear-gradient(135deg, #6C3EF4 0%, #3B8BFF 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
            textShadow: "0 0 12px rgba(108,62,244,0.6)"
          }}
        >
          Career
        </span>

        {/* Forge (theme based color) */}
        <span
          style={{
            color: dark ? "#ffffff" : "#000000",
            textShadow: dark
              ? "0 0 10px rgba(255,255,255,0.6)"
              : "0 0 6px rgba(0,0,0,0.3)"
          }}
        >
          Forge
        </span>
      </a>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => setDark(!dark)}
          className="h-9 px-3 rounded-xl border flex items-center gap-2 text-xs font-medium transition-all"
          style={{
            borderColor: dark ? "rgba(255,255,255,0.16)" : "rgba(15,23,42,0.12)",
            background: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.55)",
            color: dark ? "rgba(255,255,255,0.8)" : "rgba(15,23,42,0.75)",
          }}
          title="Toggle theme"
        >
          {dark ? <Sun size={14} /> : <MoonStar size={14} />}
          <span className="hidden sm:inline">{dark ? "Light" : "Dark"}</span>
        </button>

        <div
          onClick={() => window.location.href = "/settings"}
          className="hidden md:flex items-center gap-2 rounded-xl px-2.5 py-1.5 border cursor-pointer hover:scale-105 transition"
          style={{
            borderColor: dark ? "rgba(255,255,255,0.14)" : "rgba(15,23,42,0.12)",
            background: dark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.62)",
          }}
        >
          {avatarSrc ? (
            <img
              src={avatarSrc}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border"
              style={{ borderColor: "rgba(108,62,244,0.4)" }}
            />
          ) : (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)" }}
            >
              {initials}
            </div>
          )}
          <span
            className="text-sm font-medium max-w-[180px] truncate"
            style={{ color: dark ? "rgba(255,255,255,0.86)" : "rgba(15,23,42,0.84)" }}
          >
            {user?.name || "User"}
          </span>
        </div>
      </div>
    </header>
  );
}