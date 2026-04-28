import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/login?error=" + (error || "unknown"));
    }
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-[#0F0F1A]">
      <div className="text-center">
        <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/60 animate-spin mx-auto mb-3" />
        <p className="text-white/40 text-sm">Signing you in...</p>
      </div>
    </div>
  );
}