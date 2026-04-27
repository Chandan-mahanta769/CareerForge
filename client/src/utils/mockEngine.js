export function getRandomQuestions(allQuestions, count = 5) {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export function getTimerByDifficulty(level) {
  switch (level) {
    case "easy": return 360;
    case "medium": return 240;
    case "hard": return 180;
    default: return 240;
  }
}

export function calculateScoreDetailed(answer, expectedPoints) {
  const lower = answer.toLowerCase();

  const matched = expectedPoints.filter(p =>
    lower.includes(p.toLowerCase())
  );

  const score = Math.round(
    (matched.length / expectedPoints.length) * 100
  );

  return {
    score,

    matched,

    missing: expectedPoints.filter(p => !matched.includes(p)),

    feedback: getFeedback(score)
  };
}

function getFeedback(score) {
  if (score > 85) return "🔥 Excellent answer";
  if (score > 65) return "👍 Good, but can improve";
  if (score > 40) return "⚠ Basic answer, lacks depth";
  return "❌ Weak answer, revise concept";
}