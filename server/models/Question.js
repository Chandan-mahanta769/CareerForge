import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  problem: { type: String, required: true },
  hint: { type: String, default: "" },
  answer: { type: String, default: "" },
  language: { type: String, default: "javascript" },
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
  tags: [String],
}, { timestamps: true });

const Question = mongoose.model("Question", questionSchema);
export default Question;