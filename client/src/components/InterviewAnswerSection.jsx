import { useState } from "react";
import { ChevronDown, Copy, Check } from "lucide-react";

export default function InterviewAnswerSection({ 
  question, 
  type = "hr"
}) {
  const [showGuidance, setShowGuidance] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = question.sampleAnswer || question.answer || "";
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const getTypeColor = () => {
    const colors = {
      hr: "#6C3EF4",
      technical: "#3B8BFF",
      viva: "#10B981",
      mock: "#FF6B35"
    };
    return colors[type] || "#6C3EF4";
  };

  const typeColor = getTypeColor();

  return (
    <div className="space-y-4 mb-6">

      {/* Guidance Button (for HR and Viva with guidance) */}
      {(question.guidance || question.followUp) && (
        <button
          onClick={() => setShowGuidance(!showGuidance)}
          className="w-full rounded-[14px] border px-5 py-3 text-left transition-all duration-300"
          style={{
            background: showGuidance 
              ? `linear-gradient(135deg, ${typeColor}15, ${typeColor}08)`
              : "rgba(255,255,255,0.03)",
            borderColor: showGuidance 
              ? typeColor + "40" 
              : "rgba(255,255,255,0.10)",
            boxShadow: showGuidance 
              ? `0 8px 32px ${typeColor}20` 
              : "0 4px 16px rgba(0,0,0,0.2)",
          }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white flex items-center gap-2">
              <span>💡</span> 
              {question.guidance ? "STAR Method Guidance" : "Follow-up Questions"}
            </span>
            <ChevronDown 
              size={16} 
              style={{
                color: typeColor,
                transform: showGuidance ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s"
              }} 
            />
          </div>
        </button>
      )}

      {/* Guidance Content */}
      {showGuidance && question.guidance && (
        <div 
          className="rounded-[14px] border overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(108,62,244,0.08), rgba(59,139,255,0.04))",
            borderColor: "rgba(255,255,255,0.10)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            backdropFilter: "blur(12px)"
          }}>
          <div className="p-6 space-y-4">
            {/* STAR Method Boxes */}
            {Object.entries(question.guidance).map(([method, description], idx) => (
              <div key={method} className="flex gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-bold text-white"
                  style={{ background: typeColor + "20", color: typeColor }}>
                  {["S", "T", "A", "R"][idx]}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-bold text-white capitalize mb-1">
                    {method}
                  </h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sample Answer Button */}
      {(question.sampleAnswer || question.answer) && (
        <button
          onClick={() => setShowAnswer(!showAnswer)}
          className="w-full rounded-[14px] border px-5 py-3 text-left transition-all duration-300"
          style={{
            background: showAnswer 
              ? `linear-gradient(135deg, ${typeColor}15, ${typeColor}08)`
              : "rgba(255,255,255,0.03)",
            borderColor: showAnswer 
              ? typeColor + "40" 
              : "rgba(255,255,255,0.10)",
            boxShadow: showAnswer 
              ? `0 8px 32px ${typeColor}20` 
              : "0 4px 16px rgba(0,0,0,0.2)",
          }}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-white flex items-center gap-2">
              <span>✨</span> 
              Sample Answer
            </span>
            <ChevronDown 
              size={16} 
              style={{
                color: typeColor,
                transform: showAnswer ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s"
              }} 
            />
          </div>
        </button>
      )}

      {/* Answer Content */}
      {showAnswer && (
        <div 
          className="rounded-[14px] border overflow-hidden"
          style={{
            background: "linear-gradient(135deg, rgba(108,62,244,0.08), rgba(59,139,255,0.04))",
            borderColor: "rgba(255,255,255,0.10)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            backdropFilter: "blur(12px)"
          }}>
          
          {/* Header with copy button */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-white/8"
            style={{ background: "rgba(255,255,255,0.02)" }}>
            <span className="text-xs font-mono text-white/40">answer</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
              style={{
                background: copied ? "rgba(16,185,129,0.15)" : "rgba(255,255,255,0.05)",
                color: copied ? "#10B981" : "rgba(255,255,255,0.5)"
              }}>
              {copied ? (
                <><Check size={12} /> Copied</>
              ) : (
                <><Copy size={12} /> Copy</>
              )}
            </button>
          </div>

          {/* Answer text */}
          <div className="p-6">
            {/* If sampleAnswer is an object (STAR format) */}
            {typeof question.sampleAnswer === "object" ? (
              <div className="space-y-4">
                {Object.entries(question.sampleAnswer).map(([key, value]) => (
                  <div key={key}>
                    <h4 className="text-sm font-bold text-white/80 capitalize mb-2">
                      {key}:
                    </h4>
                    <p className="text-sm text-white/60 leading-relaxed pl-4 border-l-2" 
                      style={{ borderColor: typeColor + "40" }}>
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">
                {question.sampleAnswer || question.answer}
              </p>
            )}

            {/* Tips section */}
            {question.tips && (
              <div className="mt-6 pt-6 border-t border-white/8">
                <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">
                  💡 Tips:
                </p>
                <ul className="space-y-2">
                  {question.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-white/60 flex gap-2">
                      <span style={{ color: typeColor }}>✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Follow-up Questions */}
      {question.followUp && question.followUp.length > 0 && (
        <div 
          className="rounded-[14px] border p-6"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.08)"
          }}>
          <p className="text-xs font-bold text-white/60 uppercase tracking-wider mb-4">
            🎯 Possible Follow-ups:
          </p>
          <div className="space-y-3">
            {question.followUp.map((followUp, idx) => (
              <div key={idx}>
                <p className="text-sm font-semibold text-white/80 mb-1">
                  Q{idx + 1}: {followUp.question || followUp}
                </p>
                {followUp.answer && (
                  <p className="text-xs text-white/50 pl-4 border-l border-white/10">
                    {followUp.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}