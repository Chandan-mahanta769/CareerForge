import mongoose from "mongoose";

const todayTasksDefault = [
  { id: '1', title: 'Study: JavaScript Arrays', type: 'topic', completed: false },
  { id: '2', title: 'Solve: Reverse a String', type: 'question', completed: false },
  { id: '3', title: 'Solve: FizzBuzz', type: 'question', completed: false },
];

const taskSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  type: { type: String },
  path: { type: String, default: "" },
  completed: { type: Boolean, default: false },
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, default: null },
  googleId: { type: String, default: null },

  avatar: { type: String, default: "avatar1" },
  goal: { type: String, default: "Web Development" },

  practiceFavorites: { type: [String], default: [] },
  practiceSolved: { type: [String], default: [] }, 
  interviewSolved: { type: [String], default: [] },

  currentPath: { type: String, default: "Full Stack" },
  currentTopic: { type: String, default: "HTML" },
  progressPercent: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
  lastStudied: { type: Date, default: null },
  questionsSolved: { type: Number, default: 0 },
  topicsCompleted: { type: Number, default: 0 },
  weeklyProgress: { type: [Number], default: () => [0,0,0,0,0,0,0] },
  todayTasks: { type: [taskSchema], default: () => todayTasksDefault },
  todayTasksDate: { type: String, default: "" },
  recommendedTopic: { type: String, default: "JavaScript Arrays" },
  lastStudyContext: {
    type: {
      type: String,
      default: "general",
    },
    label: { type: String, default: "" },
    path: { type: String, default: "" },
    updatedAt: { type: Date, default: null },
  },
  badges: { type: [String], default: () => [] },
  points: { type: Number, default: 0 },

  streak:        { type: Number, default: 0 },
longestStreak: { type: Number, default: 0 },
lastActiveDate:{ type: String, default: "" }, // "YYYY-MM-DD"
 
// ── Practice stats ──
practiceSolved:    { type: [String], default: [] }, // question IDs
practiceFavorites: { type: [String], default: [] },
 
// ── Daily activity log ──
// Each entry: { date: "YYYY-MM-DD", questions: 0, steps: 0 }
dailyActivity: {
  type: [
    {
      date:      { type: String },
      questions: { type: Number, default: 0 },
      steps:     { type: Number, default: 0 },
    }
  ],
  default: [],
},
 
// ── Topic accuracy tracking ──
// Each entry: { topic: "css", attempted: 5, correct: 3 }
topicAccuracy: {
  type: [
    {
      topic:     { type: String },
      attempted: { type: Number, default: 0 },
      correct:   { type: Number, default: 0 },
    }
  ],
  default: [],
},
 
// ── Achievements unlocked ──
// Each entry: { id: "first_step", unlockedAt: Date }
achievements: {
  type: [
    {
      id:         { type: String },
      unlockedAt: { type: Date, default: Date.now },
    }
  ],
  default: [],
},
 

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;