import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid, Map, Code2, Target, TrendingUp, Settings, PanelLeftClose, PanelLeftOpen
} from "lucide-react";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", path: "/dashboard" },
  { icon: Map, label: "Roadmap", path: "/roadmap" },
  { icon: Code2, label: "Practice", path: "/practice" },
  { icon: Target, label: "Interview", path: "/interview" },
  { icon: TrendingUp, label: "Progress", path: "/progress" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className="h-full flex flex-col border-r transition-all duration-300"
      style={{
        width: collapsed ? "78px" : "248px",
        borderColor: "rgba(255,255,255,0.1)",
        background: "linear-gradient(180deg, rgba(17,17,30,0.95), rgba(10,10,22,0.92))",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="h-14 px-4 flex items-center justify-between border-b"
        style={{ borderColor: "rgba(255,255,255,0.08)" }}
      >
        <span className="ml-auto text-white/60">
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </span>
      </button>

      <nav className="flex flex-col gap-1.5 p-3 mt-2">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl border transition-all text-sm font-medium w-full text-left"
              style={{
                borderColor: active ? "rgba(108,62,244,0.55)" : "rgba(255,255,255,0.04)",
                background: active ? "linear-gradient(135deg, rgba(108,62,244,0.25), rgba(59,139,255,0.14))" : "transparent",
                color: active ? "#EDE9FE" : "rgba(255,255,255,0.65)",
              }}
            >
              <span
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                style={{
                  background: active ? "rgba(255,255,255,0.14)" : "rgba(255,255,255,0.04)",
                  color: active ? "#C4B5FD" : "rgba(255,255,255,0.6)",
                }}
              >
                <Icon size={16} />
              </span>
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}