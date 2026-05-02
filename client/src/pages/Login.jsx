import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, signupUser } from "../services/api";

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = isLogin
        ? await loginUser(form.email, form.password)
        : await signupUser(form.name, form.email, form.password);

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong");
    }
    setLoading(false);
  };

  // const apiBase =
  // (import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL || "")
  //   .replace(/\/$/, "") || "http://localhost:5000";

const googleLogin = () => {
  const SERVER = import.meta.env.VITE_SERVER_URL || "http://localhost:5000";
  const redirectOrigin = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";
  window.location.href = `${SERVER}/api/auth/google?redirectUrl=${encodeURIComponent(redirectOrigin)}`;
};

  return (
    <div className="min-h-screen dark:bg-[#0F0F1A] bg-gray-100 flex items-center justify-center px-4 font-['Inter']">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link
            to="/"
            style={{
              backgroundImage: 'linear-gradient(135deg, #6C3EF4, #3B8BFF)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '28px',
              fontWeight: '700',
              textDecoration: 'none',
            }}
          >
            CareerForge
          </Link>
          <p className="dark:text-white/40 text-gray-400 text-sm mt-2">
            {isLogin ? "Welcome back 👋" : "Start your journey today 🚀"}
          </p>
        </div>

        {/* Card */}
        <div className="dark:bg-white/3 bg-white border border-white/10 rounded-2xl p-6">

          {/* Toggle */}
          <div className="flex rounded-lg dark:bg-white/5 bg-gray-100 p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className="flex-1 py-2 text-sm font-semibold rounded-lg transition"
              style={isLogin ? {
                backgroundImage: 'linear-gradient(135deg, #6C3EF4, #3B8BFF)',
                color: 'white'
              } : { color: '#888' }}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className="flex-1 py-2 text-sm font-semibold rounded-lg transition"
              style={!isLogin ? {
                backgroundImage: 'linear-gradient(135deg, #6C3EF4, #3B8BFF)',
                color: 'white'
              } : { color: '#888' }}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={submit} className="flex flex-col gap-3">
            {!isLogin && (
              <input
                name="name"
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={handle}
                required
                className="w-full px-4 py-3 rounded-[10px] text-sm border border-white/10 dark:bg-white/5 bg-gray-50 dark:text-white text-gray-800 outline-none focus:border-[#6C3EF4] transition"
              />
            )}
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handle}
              required
              className="w-full px-4 py-3 rounded-[10px] text-sm border border-white/10 dark:bg-white/5 bg-gray-50 dark:text-white text-gray-800 outline-none focus:border-[#6C3EF4] transition"
            />
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handle}
                required
                className="w-full px-4 py-3 rounded-[10px] text-sm border border-white/10 dark:bg-white/5 bg-gray-50 dark:text-white text-gray-800 outline-none focus:border-[#6C3EF4] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-gray-500 hover:text-gray-900 dark:text-white/50 dark:hover:text-white"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-[10px] text-white font-semibold text-sm hover:opacity-90 transition mt-1"
              style={{ backgroundImage: 'linear-gradient(135deg, #6C3EF4, #3B8BFF)' }}
            >
              {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px dark:bg-white/10 bg-gray-200" />
            <span className="text-xs dark:text-white/30 text-gray-400">or</span>
            <div className="flex-1 h-px dark:bg-white/10 bg-gray-200" />
          </div>

          {/* Google Login */}
          <button
            onClick={googleLogin}
            className="w-full py-3 rounded-[10px] text-sm font-semibold border border-white/10 dark:bg-white/5 bg-gray-50 dark:text-white text-gray-700 hover:dark:bg-white/10 hover:bg-gray-100 transition flex items-center justify-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Continue with Google
          </button>

          {/* Guest */}
          <div className="text-center mt-4">
            <Link
              to="/explore"
              className="text-xs dark:text-white/30 text-gray-400 hover:text-[#6C3EF4] transition"
            >
              Continue as Guest → Explore roadmap only
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}