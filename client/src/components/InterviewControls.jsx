import { ChevronLeft, ChevronRight, Star, Share2, Home } from "lucide-react";
import { getQuestionTypeInfo } from "../utils/interviewEngine";

export default function InterviewControls({
  onPrev,
  onNext,
  onBookmark,
  isBookmarked = false,
  isFirstQuestion = false,
  isLastQuestion = false,
  currentIndex = 0,
  total = 5,
  type = "hr",
  onBack
}) {
  const typeInfo = getQuestionTypeInfo(type);
  const progressPercent = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-white/40 uppercase tracking-wider">
            Progress
          </span>
          <span className="text-xs font-bold text-white/60">
            {currentIndex + 1}/{total}
          </span>
        </div>
        <div className="w-full h-2 rounded-full overflow-hidden" 
          style={{ background: "rgba(255,255,255,0.06)" }}>
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${progressPercent}%`,
              backgroundImage: `linear-gradient(90deg, ${typeInfo.color}, ${typeInfo.color}cc)`,
              boxShadow: `0 0 16px ${typeInfo.color}40`
            }}
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-3">
        {/* Bookmark button */}
        <button
          onClick={onBookmark}
          className="rounded-[10px] border px-4 py-3 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm"
          style={{
            background: isBookmarked 
              ? "rgba(251,191,36,0.15)"
              : "rgba(255,255,255,0.04)",
            borderColor: isBookmarked 
              ? "rgba(251,191,36,0.4)"
              : "rgba(255,255,255,0.10)",
            color: isBookmarked ? "#FBBF24" : "rgba(255,255,255,0.5)",
            boxShadow: isBookmarked 
              ? "0 4px 16px rgba(251,191,36,0.15)"
              : "none"
          }}>
          <Star size={14} className={isBookmarked ? "fill-current" : ""} />
          <span className="hidden sm:inline">{isBookmarked ? "Saved" : "Save"}</span>
        </button>

        {/* Share button */}
        <button
          onClick={() => navigator.share?.({ title: "Interview Prep", text: "Practice with CareerForge" })}
          className="rounded-[10px] border px-4 py-3 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm"
          style={{
            background: "rgba(255,255,255,0.04)",
            borderColor: "rgba(255,255,255,0.10)",
            color: "rgba(255,255,255,0.5)"
          }}>
          <Share2 size={14} />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-3">
        {/* Previous button */}
        <button
          onClick={onPrev}
          disabled={isFirstQuestion}
          className="flex-1 rounded-[10px] border px-4 py-3 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm"
          style={{
            background: isFirstQuestion 
              ? "rgba(255,255,255,0.02)" 
              : "rgba(255,255,255,0.04)",
            borderColor: isFirstQuestion 
              ? "rgba(255,255,255,0.05)" 
              : "rgba(255,255,255,0.10)",
            color: isFirstQuestion 
              ? "rgba(255,255,255,0.2)" 
              : "rgba(255,255,255,0.6)",
            cursor: isFirstQuestion ? "not-allowed" : "pointer",
            opacity: isFirstQuestion ? 0.5 : 1
          }}>
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        {/* Next button */}
        <button
          onClick={onNext}
          disabled={isLastQuestion}
          className="flex-1 rounded-[10px] border px-4 py-3 transition-all duration-300 flex items-center justify-center gap-2 font-medium text-sm text-white"
          style={{
            backgroundImage: isLastQuestion 
              ? "none" 
              : `linear-gradient(135deg, ${typeInfo.color}, ${typeInfo.color}cc)`,
            background: isLastQuestion 
              ? "rgba(255,255,255,0.02)" 
              : undefined,
            borderColor: isLastQuestion 
              ? "rgba(255,255,255,0.05)" 
              : typeInfo.color + "40",
            color: isLastQuestion ? "rgba(255,255,255,0.2)" : "white",
            boxShadow: isLastQuestion 
              ? "none" 
              : `0 8px 24px ${typeInfo.color}30`,
            cursor: isLastQuestion ? "not-allowed" : "pointer",
            opacity: isLastQuestion ? 0.5 : 1
          }}>
          <span>{isLastQuestion ? "Finished" : "Next"}</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Back button */}
      {onBack && (
        <button
          onClick={onBack}
          className="w-full rounded-[10px] border px-4 py-2.5 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium"
          style={{
            background: "rgba(255,255,255,0.02)",
            borderColor: "rgba(255,255,255,0.08)",
            color: "rgba(255,255,255,0.5)"
          }}>
          <Home size={14} />
          Back to Interview
        </button>
      )}
    </div>
  );
}