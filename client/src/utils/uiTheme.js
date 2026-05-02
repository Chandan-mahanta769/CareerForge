export const dashboardAuroraBackground =
  "radial-gradient(circle at 15% 10%, rgba(108,62,244,0.2), transparent 40%), radial-gradient(circle at 88% 5%, rgba(59,139,255,0.16), transparent 36%), #0A0A14";

export const glassCardStyle = (accent = "#6C3EF4", active = false) => ({
  background: active
    ? `linear-gradient(140deg, ${accent}18, rgba(255,255,255,0.06))`
    : "linear-gradient(140deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))",
  border: `1px solid ${active ? `${accent}66` : "rgba(255,255,255,0.09)"}`,
  boxShadow: active ? `0 12px 38px ${accent}20` : "0 10px 30px rgba(2,8,23,0.2)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  transition: "background 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
});
