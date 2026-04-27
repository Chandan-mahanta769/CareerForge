import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import {
  User, KeyRound, ChevronDown, ChevronUp,
  Sun, Moon, Target, AlertTriangle,
  Check, LogOut, Save
} from "lucide-react";
import DashboardNavbar from "../components/DashboardNavbar";
import Sidebar from "../components/Sidebar";
import { getUserProfile, changePassword, resetAllProgress, updateProfile } from "../services/api";

// avatar imports
import av1 from "../assets/avatars/avatar1.jpg";
import av2 from "../assets/avatars/avatar2.jpg";
import av3 from "../assets/avatars/avatar3.jpg";
import av4 from "../assets/avatars/avatar4.jpg";
import av5 from "../assets/avatars/avatar5.jpg";
import av6 from "../assets/avatars/avatar6.jpg";
import av7 from "../assets/avatars/avatar7.jpg";
import av8 from "../assets/avatars/avatar8.jpg";

const AVATAR_LIST = [
  { id: "avatar1", src: av1, label: "Boy 1",  gender: "male" },
  { id: "avatar2", src: av2, label: "Boy 2",  gender: "male" },
  { id: "avatar3", src: av3, label: "Boy 3",  gender: "male" },
  { id: "avatar4", src: av4, label: "Boy 4",  gender: "male" },
  { id: "avatar5", src: av5, label: "Girl 1", gender: "female" },
  { id: "avatar6", src: av6, label: "Girl 2", gender: "female" },
  { id: "avatar7", src: av7, label: "Girl 3", gender: "female" },
  { id: "avatar8", src: av8, label: "Girl 4", gender: "female" },
];

export const getAvatarSrc = (id) =>
  AVATAR_LIST.find(a => a.id === id)?.src || av1;

const GOALS = [
  "Web Development",
  "AI / ML",
  "Cloud & DevOps",
  "Data Science",
  "Cybersecurity",
  "Mobile Development",
];

const glassCard = (color = "#6C3EF4") => ({
  background: `linear-gradient(135deg, ${color}12, ${color}05)`,
  border: `1px solid ${color}30`,
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: `0 0 32px ${color}10`,
  borderRadius: "18px",
  transition: "all 0.3s ease",
});

const inputClass =
  "w-full px-4 py-3 rounded-[10px] text-sm border border-white/10 dark:bg-white/5 bg-white dark:text-white text-gray-800 outline-none focus:border-[#6C3EF4] transition";

// ── Section Card ──────────────────────────────────────────────────
function SectionCard({ title, icon, color = "#6C3EF4", children }) {
  const Icon = icon;
  return (
    <div className="p-6" style={glassCard(color)}>
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-8 h-8 rounded-[8px] flex items-center justify-center"
          style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
          <Icon size={15} style={{ color }} />
        </div>
        <h2 className="text-sm font-semibold dark:text-white text-gray-800 tracking-wide">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

// ── Reset Modal ───────────────────────────────────────────────────
function ResetModal({ onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="w-full max-w-sm p-7 rounded-[20px]"
        style={{ background: "#0F0F1A", border: "1px solid rgba(255,107,53,0.35)", boxShadow: "0 0 60px rgba(255,107,53,0.15)" }}>
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "rgba(255,107,53,0.15)", border: "1px solid rgba(255,107,53,0.3)" }}>
            <AlertTriangle size={28} style={{ color: "#FF6B35" }} />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Reset All Progress?</h3>
          <p className="text-white/40 text-sm leading-relaxed">
            This permanently deletes your roadmap progress, quiz scores,
            practice history, streak and points.{" "}
            <span className="text-red-400 font-semibold">Cannot be undone.</span>
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={onCancel}
            className="flex-1 py-3 rounded-[12px] text-sm font-semibold border border-white/10 dark:text-white/50 hover:dark:text-white transition">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 py-3 rounded-[12px] text-sm font-semibold text-white hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: "linear-gradient(135deg, #FF6B35, #ff4444)" }}>
            <AlertTriangle size={13} />
            {loading ? "Resetting..." : "Yes, Reset All"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Settings ─────────────────────────────────────────────────
export default function Settings() {
  const navigate = useNavigate();
  const { dark, setDark } = useTheme();
  const [user, setUser] = useState(null);

  // profile
  const [name, setName]               = useState("");
  const [savingName, setSavingName]   = useState(false);
  const [nameMsg, setNameMsg]         = useState({ text: "", ok: true });

  // password
  const [showPwd, setShowPwd]         = useState(false);
  const [currentPwd, setCurrentPwd]   = useState("");
  const [newPwd, setNewPwd]           = useState("");
  const [confirmPwd, setConfirmPwd]   = useState("");
  const [pwdMsg, setPwdMsg]           = useState({ text: "", ok: true });
  const [savingPwd, setSavingPwd]     = useState(false);

  // avatar
  const [showAvatars, setShowAvatars] = useState(false);
  const [avatar, setAvatar]           = useState("avatar1");
  const [savingAvatar, setSavingAvatar] = useState(false);

  // goal
  const [showGoal, setShowGoal]       = useState(false);
  const [goal, setGoal]               = useState("Web Development");
  const [tempGoal, setTempGoal]       = useState("Web Development");
  const [savingGoal, setSavingGoal]   = useState(false);
  const [goalMsg, setGoalMsg]         = useState("");

  // reset
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetting, setResetting]     = useState(false);
  const [resetMsg, setResetMsg]       = useState({ text: "", ok: true });

  // load user from backend on mount — persists across reload
  useEffect(() => {
    getUserProfile()
      .then((u) => {
        setUser(u);
        setName(u?.name || "");
        setAvatar(u?.avatar || "avatar1");
        setGoal(u?.goal || "Web Development");
        setTempGoal(u?.goal || "Web Development");
        // also sync theme from localStorage
        const saved = localStorage.getItem("cf_theme");
        if (saved) setDark(saved === "dark");
      })
      .catch(() => navigate("/login"));
  }, [navigate]);

  // sync theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cf_theme", dark ? "dark" : "light");
  }, [dark]);

  // ── Save Name ─────────────────────────────────────────────────
  const saveName = async () => {
    setSavingName(true);
    try {
      const updated = await updateProfile({ name });
      setUser(updated);
      setNameMsg({ text: "Name saved!", ok: true });
    } catch {
      setNameMsg({ text: "Failed to save.", ok: false });
    }
    setSavingName(false);
    setTimeout(() => setNameMsg({ text: "", ok: true }), 2500);
  };

  // ── Save Avatar ───────────────────────────────────────────────
  const saveAvatar = async (id) => {
    setSavingAvatar(true);
    try {
      const updated = await updateProfile({ avatar: id });
      setAvatar(id);
      setUser(updated);
      setShowAvatars(false);
      // dispatch event so navbar re-renders immediately
      window.dispatchEvent(new Event("profileUpdated"));
    } catch (err) {
      console.error(err);
    }
    setSavingAvatar(false);
  };

  // ── Save Goal ─────────────────────────────────────────────────
  const saveGoal = async () => {
    setSavingGoal(true);
    try {
      const updated = await updateProfile({ goal: tempGoal });
      setGoal(tempGoal);
      setUser(updated);
      setShowGoal(false);
      setGoalMsg("Goal saved!");
      setTimeout(() => setGoalMsg(""), 2000);
    } catch {
      setGoalMsg("Failed to save.");
    }
    setSavingGoal(false);
  };

  // ── Change Password ───────────────────────────────────────────
  const handleChangePwd = async () => {
    setPwdMsg({ text: "", ok: true });
    if (newPwd !== confirmPwd) { setPwdMsg({ text: "Passwords don't match", ok: false }); return; }
    if (newPwd.length < 6)    { setPwdMsg({ text: "Min 6 characters",        ok: false }); return; }
    setSavingPwd(true);
    try {
      await changePassword(currentPwd, newPwd);
      setPwdMsg({ text: "Password changed!", ok: true });
      setCurrentPwd(""); setNewPwd(""); setConfirmPwd("");
      setShowPwd(false);
    } catch (err) {
      setPwdMsg({ text: err.message, ok: false });
    }
    setSavingPwd(false);
  };

  // ── Reset All ─────────────────────────────────────────────────
  const handleReset = async () => {
    setResetting(true);
    try {
      await resetAllProgress();
      setShowResetModal(false);
      setResetMsg({ text: "All progress reset.", ok: true });
    } catch {
      setResetMsg({ text: "Failed to reset.", ok: false });
    }
    setResetting(false);
    setTimeout(() => setResetMsg({ text: "", ok: true }), 3000);
  };

  // ── Logout ────────────────────────────────────────────────────
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const currentAvatarSrc = AVATAR_LIST.find(a => a.id === avatar)?.src || av1;

  return (
    <div className="min-h-screen dark:bg-[#0F0F1A] bg-gray-100 font-['Inter'] flex flex-col">
      {showResetModal && (
        <ResetModal
          onConfirm={handleReset}
          onCancel={() => setShowResetModal(false)}
          loading={resetting}
        />
      )}

      <DashboardNavbar user={user} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6">

          <div className="mb-8">
            <h1 className="text-2xl font-bold dark:text-white text-gray-800 mb-1">⚙️ Settings</h1>
            <p className="text-sm dark:text-white/40 text-gray-400">
              Manage your profile, appearance and preferences
            </p>
          </div>

          <div className="max-w-2xl flex flex-col gap-5">

            {/* ── Card 1: Profile ───────────────────────────── */}
            <SectionCard title="Profile" icon={User} color="#6C3EF4">

              {/* Email — read only */}
              <div className="mb-4">
                <label className="text-xs dark:text-white/40 text-gray-400 mb-1.5 block">Email</label>
                <div className="px-4 py-3 rounded-[10px] text-sm dark:text-white/30 text-gray-400 select-none"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  {user?.email || "—"}
                </div>
              </div>

              {/* Display Name */}
              <div className="mb-4">
                <label className="text-xs dark:text-white/40 text-gray-400 mb-1.5 block">Display Name</label>
                <div className="flex gap-2">
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                  <button
                    onClick={saveName}
                    disabled={savingName}
                    className="px-4 py-2 rounded-[10px] text-sm font-semibold text-white hover:opacity-90 transition flex items-center gap-1.5 flex-shrink-0"
                    style={{ backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)" }}
                  >
                    {savingName ? "..." : <><Save size={13} /> Save</>}
                  </button>
                </div>
                {nameMsg.text && (
                  <p className={`text-xs mt-1.5 ${nameMsg.ok ? "text-green-400" : "text-red-400"}`}>
                    {nameMsg.text}
                  </p>
                )}
              </div>

              {/* Change Password */}
              <div className="mb-4">
                <button
                  onClick={() => setShowPwd(!showPwd)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#6C3EF4] hover:text-[#3B8BFF] transition"
                >
                  <KeyRound size={14} />
                  Change Password
                  {showPwd ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {showPwd && (
                  <div className="mt-3 flex flex-col gap-3 p-4 rounded-[12px]"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    {[
                      { label: "Current Password", val: currentPwd, set: setCurrentPwd },
                      { label: "New Password",     val: newPwd,     set: setNewPwd     },
                      { label: "Confirm Password", val: confirmPwd, set: setConfirmPwd },
                    ].map(f => (
                      <div key={f.label}>
                        <label className="text-xs dark:text-white/40 text-gray-400 mb-1 block">{f.label}</label>
                        <input
                          type="password"
                          value={f.val}
                          onChange={(e) => f.set(e.target.value)}
                          className={inputClass}
                          placeholder="••••••••"
                        />
                      </div>
                    ))}
                    {pwdMsg.text && (
                      <p className={`text-xs ${pwdMsg.ok ? "text-green-400" : "text-red-400"}`}>
                        {pwdMsg.text}
                      </p>
                    )}
                    <button
                      onClick={handleChangePwd}
                      disabled={savingPwd}
                      className="py-2.5 rounded-[10px] text-sm font-semibold text-white hover:opacity-90 transition flex items-center justify-center gap-2"
                      style={{ backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)" }}
                    >
                      <KeyRound size={13} />
                      {savingPwd ? "Changing..." : "Update Password"}
                    </button>
                  </div>
                )}
              </div>

              {/* Avatar */}
              <div>
                <button
                  onClick={() => setShowAvatars(!showAvatars)}
                  className="flex items-center gap-2 text-sm font-semibold text-[#6C3EF4] hover:text-[#3B8BFF] transition"
                >
                  {/* current avatar preview */}
                  <img
                    src={currentAvatarSrc}
                    alt="avatar"
                    className="w-7 h-7 rounded-full border-2"
                    style={{ borderColor: "rgba(108,62,244,0.5)" }}
                  />
                  Change Avatar
                  {showAvatars ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>

                {showAvatars && (
                  <div className="mt-4 p-4 rounded-[12px]"
                    style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <p className="text-xs dark:text-white/30 text-gray-400 mb-3">Male</p>
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {AVATAR_LIST.filter(a => a.gender === "male").map(av => (
                        <button
                          key={av.id}
                          onClick={() => saveAvatar(av.id)}
                          disabled={savingAvatar}
                          className="flex flex-col items-center gap-1.5 p-2 rounded-[10px] transition-all"
                          style={{
                            border: avatar === av.id ? "2px solid #6C3EF4" : "1px solid rgba(255,255,255,0.08)",
                            background: avatar === av.id ? "rgba(108,62,244,0.15)" : "rgba(255,255,255,0.03)",
                            transform: avatar === av.id ? "scale(1.06)" : "scale(1)",
                            boxShadow: avatar === av.id ? "0 0 16px rgba(108,62,244,0.3)" : "none",
                          }}
                        >
                          <img src={av.src} alt={av.label} className="w-12 h-12 rounded-full object-cover" />
                          <span className="text-xs dark:text-white/40 text-gray-400">{av.label}</span>
                          {avatar === av.id && <Check size={12} style={{ color: "#6C3EF4" }} />}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs dark:text-white/30 text-gray-400 mb-3">Female</p>
                    <div className="grid grid-cols-4 gap-3">
                      {AVATAR_LIST.filter(a => a.gender === "female").map(av => (
                        <button
                          key={av.id}
                          onClick={() => saveAvatar(av.id)}
                          disabled={savingAvatar}
                          className="flex flex-col items-center gap-1.5 p-2 rounded-[10px] transition-all"
                          style={{
                            border: avatar === av.id ? "2px solid #6C3EF4" : "1px solid rgba(255,255,255,0.08)",
                            background: avatar === av.id ? "rgba(108,62,244,0.15)" : "rgba(255,255,255,0.03)",
                            transform: avatar === av.id ? "scale(1.06)" : "scale(1)",
                            boxShadow: avatar === av.id ? "0 0 16px rgba(108,62,244,0.3)" : "none",
                          }}
                        >
                          <img src={av.src} alt={av.label} className="w-12 h-12 rounded-full object-cover" />
                          <span className="text-xs dark:text-white/40 text-gray-400">{av.label}</span>
                          {avatar === av.id && <Check size={12} style={{ color: "#6C3EF4" }} />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SectionCard>

            {/* ── Card 2: Appearance ────────────────────────── */}
            <SectionCard title="Appearance" icon={Sun} color="#3B8BFF">
              <p className="text-xs dark:text-white/30 text-gray-400 mb-4">
                Choose your preferred theme
              </p>
              <div className="flex gap-3">
                {/* Light button */}
                <button
                  onClick={() => setDark(false)}
                  className="flex-1 py-3 rounded-[12px] text-sm font-semibold transition flex items-center justify-center gap-2"
                  style={!dark
                    ? { backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)", color: "white" }
                    : { background: "rgba(255,255,255,0.04)", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  <Sun size={15} /> Light
                </button>

                {/* Dark button */}
                <button
                  onClick={() => setDark(true)}
                  className="flex-1 py-3 rounded-[12px] text-sm font-semibold transition flex items-center justify-center gap-2"
                  style={dark
                    ? { backgroundImage: "linear-gradient(135deg, #6C3EF4, #3B8BFF)", color: "white" }
                    : { background: "rgba(255,255,255,0.04)", color: "#888", border: "1px solid rgba(255,255,255,0.08)" }
                  }
                >
                  <Moon size={15} /> Dark
                </button>
              </div>
            </SectionCard>

            {/* ── Card 3: Career Goal ───────────────────────── */}
            <SectionCard title="Career Goal" icon={Target} color="#10B981">
              {/* Header row — shows current goal + arrow */}
              <button
                onClick={() => { setShowGoal(!showGoal); setTempGoal(goal); }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-[10px] transition text-left"
                style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)" }}
              >
                <div>
                  <p className="text-xs dark:text-white/40 text-gray-400 mb-0.5">Current Goal</p>
                  <p className="text-sm font-semibold" style={{ color: "#10B981" }}>{goal}</p>
                </div>
                {showGoal
                  ? <ChevronUp size={16} style={{ color: "#10B981" }} />
                  : <ChevronDown size={16} style={{ color: "#10B981" }} />
                }
              </button>

              {/* Expanded goal list */}
              {showGoal && (
                <div className="mt-3 flex flex-col gap-2">
                  {GOALS.map(g => (
                    <button
                      key={g}
                      onClick={() => setTempGoal(g)}
                      className="flex items-center justify-between px-4 py-3 rounded-[10px] text-sm transition text-left"
                      style={tempGoal === g
                        ? { background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.4)", color: "#10B981", fontWeight: 600 }
                        : { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.5)" }
                      }
                    >
                      {g}
                      {tempGoal === g && <Check size={13} style={{ color: "#10B981" }} />}
                    </button>
                  ))}

                  {/* Save button — closes on save */}
                  <button
                    onClick={saveGoal}
                    disabled={savingGoal}
                    className="mt-1 py-3 rounded-[10px] text-sm font-semibold text-white hover:opacity-90 transition flex items-center justify-center gap-2"
                    style={{ backgroundImage: "linear-gradient(135deg, #10B981, #059669)" }}
                  >
                    <Save size={13} />
                    {savingGoal ? "Saving..." : "Save Goal"}
                  </button>
                </div>
              )}

              {goalMsg && (
                <p className="text-xs text-green-400 mt-2">{goalMsg}</p>
              )}
            </SectionCard>

            {/* ── Card 4: Danger Zone ───────────────────────── */}
            <SectionCard title="Danger Zone" icon={AlertTriangle} color="#FF6B35">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm dark:text-white text-gray-800 font-medium mb-0.5">
                    Reset All Progress
                  </p>
                  <p className="text-xs dark:text-white/30 text-gray-400">
                    Clears roadmap, quiz, practice, streak and points
                  </p>
                </div>
                <button
                  onClick={() => setShowResetModal(true)}
                  className="px-4 py-2 rounded-[10px] text-sm font-semibold text-white hover:opacity-90 transition flex items-center gap-1.5 flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #FF6B35, #ff4444)" }}
                >
                  <AlertTriangle size={13} /> Reset
                </button>
              </div>
              {resetMsg.text && (
                <p className={`text-xs mt-3 ${resetMsg.ok ? "text-green-400" : "text-red-400"}`}>
                  {resetMsg.text}
                </p>
              )}
            </SectionCard>

            {/* ── Logout ────────────────────────────────────── */}
            <button
              onClick={handleLogout}
              className="flex items-center justify-center gap-2 py-3.5 rounded-[14px] text-sm font-semibold text-red-400 border border-red-400/20 hover:bg-red-400/10 transition"
            >
              <LogOut size={15} />
              Logout from CareerForge
            </button>

          </div>
        </main>
      </div>
    </div>
  );
}