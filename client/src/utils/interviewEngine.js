/**
 * Interview Engine Utilities
 * Handles random question selection and interview flow
 */

/**
 * Get random questions from array
 * @param {Array} questions - All available questions
 * @param {Number} count - How many to select
 * @returns {Array} Random questions
 */
export const getRandomInterviewQuestions = (questions, count = 5) => {
  if (!questions || questions.length === 0) return [];
  
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, questions.length));
};

/**
 * Format answer for display
 * @param {String|Object} answer - The answer text or object
 * @returns {String} Formatted answer
 */
export const formatAnswer = (answer) => {
  if (typeof answer === "string") return answer;
  if (typeof answer === "object") {
    return Object.values(answer).join("\n\n");
  }
  return "";
};

/**
 * Get question type label
 * @param {String} type - Question type
 * @returns {Object} Label and color
 */
export const getQuestionTypeInfo = (type) => {
  const types = {
    hr: { label: "HR Interview", color: "#6C3EF4", bgColor: "rgba(108,62,244,0.1)" },
    technical: { label: "Technical Interview", color: "#3B8BFF", bgColor: "rgba(59,139,255,0.1)" },
    viva: { label: "Viva Interview", color: "#10B981", bgColor: "rgba(16,185,129,0.1)" },
    mock: { label: "Mock Interview", color: "#FF6B35", bgColor: "rgba(255,107,53,0.1)" },
  };
  return types[type] || types.hr;
};

/**
 * Calculate progress percentage
 * @param {Number} current - Current index
 * @param {Number} total - Total questions
 * @returns {Number} Progress 0-100
 */
export const getProgressPercentage = (current, total) => {
  if (total === 0) return 0;
  return Math.round(((current + 1) / total) * 100);
};