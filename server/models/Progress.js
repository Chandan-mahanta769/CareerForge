import mongoose from "mongoose";

const stepSchema = new mongoose.Schema({
  stepId: String,
  completed: { type: Boolean, default: false },
  completedAt: { type: Date, default: null },
});

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: String,
  trackId: String,
  stackId: String,
  steps: [stepSchema],
}, { timestamps: true });

const Progress = mongoose.model("Progress", progressSchema);
export default Progress;