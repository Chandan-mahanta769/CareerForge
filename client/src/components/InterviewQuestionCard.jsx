import { getQuestionTypeInfo } from "../utils/interviewEngine";

export default function InterviewQuestionCard({ 
  question, 
  index, 
  total, 
  type = "hr" 
}) {
  const typeInfo = getQuestionTypeInfo(type);
  const questionNumber = index + 1;

  return (
    <div className="rounded-[16px] border overflow-hidden mb-6"
      style={{
        background: "linear-gradient(135deg, rgba(108,62,244,0.06), rgba(59,139,255,0.04))",
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
        backdropFilter: "blur(12px)",
      }}>

      {/* Header with type badge */}
      <div className="flex items-start justify-between px-6 py-4 border-b border-white/8">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <span 
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ 
                background: typeInfo.bgColor, 
                color: typeInfo.color,
                border: `1px solid ${typeInfo.color}40`
              }}>
              {typeInfo.label}
            </span>
            <span className="text-xs text-white/40">
              Question {questionNumber}/{total}
            </span>
          </div>
        </div>

        {/* Progress percentage */}
        <div className="text-right">
          <span 
            className="text-sm font-bold"
            style={{ color: typeInfo.color }}>
            {Math.round((questionNumber / total) * 100)}%
          </span>
        </div>
      </div>

      {/* Question text */}
      <div className="px-6 py-5">
        <h2 className="text-xl font-bold text-white leading-relaxed">
          {question.question}
        </h2>

        {/* Optional hint for technical questions */}
        {question.hint && (
          <div className="mt-4 p-3 rounded-[10px] flex items-start gap-2"
            style={{ background: "rgba(245,158,11,0.08)", borderLeft: `2px solid rgba(245,158,11,0.4)` }}>
            <span className="text-sm" style={{ color: "#F59E0B" }}>💡</span>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(245,158,11,0.85)" }}>
              {question.hint}
            </p>
          </div>
        )}

        {/* Guidance for HR questions (STAR method) */}
        {question.guidance && (
          <div className="mt-4 p-4 rounded-[10px] bg-white/[0.02] border border-white/8">
            <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
              📋 STAR Method Guide:
            </p>
            <div className="space-y-2">
              {Object.entries(question.guidance).map(([key, value]) => (
                <div key={key} className="flex gap-3">
                  <span className="text-sm font-semibold text-white/40 uppercase w-16">
                    {key}:
                  </span>
                  <span className="text-sm text-white/60">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Category for technical/viva questions */}
        {question.category && (
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs text-white/40">Category:</span>
            <span 
              className="text-xs px-2.5 py-1 rounded-full font-semibold"
              style={{ 
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.7)"
              }}>
              {question.category}
            </span>
          </div>
        )}
      </div>

      {/* Bottom progress bar */}
      <div className="h-1 bg-white/5">
        <div 
          className="h-full transition-all duration-700"
          style={{ 
            width: `${(questionNumber / total) * 100}%`,
            backgroundImage: "linear-gradient(90deg, " + typeInfo.color + "80, " + typeInfo.color + ")"
          }} />
      </div>
    </div>
  );
}