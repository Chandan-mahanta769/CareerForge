import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  id: String,
  title: String,
  icon: String,
  color: { type: String, default: "#6C3EF4" },
  topics: [String],
});

const stackSchema = new mongoose.Schema({
  id: String,
  title: String,
  icon: String,
  duration: String,
  difficulty: { type: String, enum: ["Beginner", "Intermediate", "Advanced"] },
  locked: { type: Boolean, default: false },
  steps: [stepSchema],
});

const trackSchema = new mongoose.Schema({
  id: String,
  title: String,
  icon: String,
  desc: String,
  locked: { type: Boolean, default: false },
  stacks: [stackSchema],
});

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  icon: { type: String, default: "🌐" },
  color: { type: String, default: "#6C3EF4" },
  locked: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  tracks: [trackSchema],
}, { timestamps: true });

const Course = mongoose.model("Course", courseSchema);
export default Course;