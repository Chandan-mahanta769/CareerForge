import mongoose from "mongoose";

const quizResultSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  stepId: String,
  stackId: String,
  score: Number,
  total: Number,
  percent: Number,
  answers: [{ question: String, selected: String, correct: String, isCorrect: Boolean }],
}, { timestamps: true });

const QuizResult = mongoose.model("QuizResult", quizResultSchema);

export default QuizResult;