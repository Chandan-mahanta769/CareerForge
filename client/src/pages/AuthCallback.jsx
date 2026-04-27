import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = params.get("token");
    const error = params.get("error");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/dashboard");
    } else {
      navigate("/login?error=" + (error || "unknown"));
    }
  }, [navigate, params]);

  return (
    <div className="min-h-screen dark:bg-[#0F0F1A] bg-gray-100 flex items-center justify-center">
      <p className="dark:text-white/40 text-gray-400 text-sm">Signing you in...</p>
    </div>
  );
}