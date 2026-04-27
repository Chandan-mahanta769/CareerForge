import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: String,
  type: { type: String, enum: ["mcq", "truefalse"] },
  options: [String],
  correct: String,
});

const topicSchema = new mongoose.Schema({
  stepId: { type: String, required: true },
  stackId: { type: String, required: true },
  trackId: { type: String, required: true },
  categoryId: { type: String, required: true },
  title: { type: String, required: true },
  youtubeId: { type: String, default: "" },
  notes: { type: String, default: "" },
  shortNotes: { type: String, default: "" },
  notesPdfUrl: { type: String, default: "" },
  realWorldExample: { type: String, default: "" },
  realWorldProblem: { type: String, default: "" },
  resources: [{ label: String, url: String }],
  quiz: [quizSchema],
}, { timestamps: true });

const Topic = mongoose.model("Topic", topicSchema);

export default Topic;