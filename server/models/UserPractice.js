import mongoose from "mongoose";

const userPracticeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
  solved: { type: Boolean, default: false },
  favorite: { type: Boolean, default: false },
  attempts: { type: Number, default: 0 },
  correct: { type: Number, default: 0 },
}, { timestamps: true });

const UserPractice = mongoose.model("UserPractice", userPracticeSchema);
export default UserPractice;