import express from "express";
import User from "../models/users.js";
import authMiddleware from "../middleware/authMiddleware.js";

import Progress from "../models/Progress.js";
import QuizResult from "../models/QuizResult.js";
import UserPractice from "../models/UserPractice.js";
import bcrypt from "bcryptjs";

const router = express.Router();
const taskPool = [
  { title: "Solve a Practice Question", type: "practice", path: "/practice" },
  { title: "Attempt an Interview Question", type: "interview", path: "/interview/technical" },
  { title: "Complete One Roadmap Step", type: "roadmap", path: "/roadmap" },
  { title: "Revise a Favorite Question", type: "practice", path: "/practice" },
  { title: "Do a Timed Mock Interview", type: "interview", path: "/interview/mock" },
];

const dayKey = () => new Date().toISOString().slice(0, 10);

const updateDailyStudy = (user, context = {}) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (user.lastStudied) {
    const last = new Date(user.lastStudied);
    last.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) user.streak += 1;
    else if (diffDays > 1) user.streak = 1;
  } else {
    user.streak = 1;
  }

  user.lastStudied = new Date();
  user.points += 5;
  user.lastStudyContext = {
    type: context.type || "general",
    label: context.label || "",
    path: context.path || "",
    updatedAt: new Date(),
  };
};

const ensureTodayTasks = (user) => {
  const today = dayKey();
  if (user.todayTasksDate === today && Array.isArray(user.todayTasks) && user.todayTasks.length) {
    return;
  }

  const shuffled = [...taskPool].sort(() => Math.random() - 0.5).slice(0, 3);
  user.todayTasks = shuffled.map((task, idx) => ({
    id: `${today}-${idx + 1}`,
    title: task.title,
    type: task.type,
    path: task.path,
    completed: false,
  }));
  user.todayTasksDate = today;
};

// GET /api/user/profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/user/stats
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    const roadmapProgress = await Progress.find({ userId: req.user.id }).select("steps");

    const roadmapCompletedSteps = roadmapProgress.reduce(
      (acc, item) => acc + (item.steps || []).filter((step) => step.completed).length,
      0
    );
    const practiceSolvedCount = (user.practiceSolved || []).length;
    const interviewSolvedCount = (user.interviewSolved || []).length;
    const questionsSolved = practiceSolvedCount + interviewSolvedCount;

    if (user.lastStudied) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const last = new Date(user.lastStudied);
      last.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((today - last) / (1000 * 60 * 60 * 24));
      if (diffDays > 1) user.streak = 0;
    }

    ensureTodayTasks(user);

    const recommendedTopic =
      roadmapCompletedSteps < 3
        ? "Continue your roadmap fundamentals"
        : practiceSolvedCount < 15
        ? "Solve more practice questions"
        : interviewSolvedCount < 8
        ? "Start technical interview drills"
        : "Try a mock interview round";

    await user.save();

    res.json({
      name: user.name,
      currentPath: user.currentPath,
      currentTopic: user.currentTopic,
      progressPercent: user.progressPercent || 0,
      streak: user.streak,
      questionsSolved,
      practiceSolvedCount,
      interviewSolvedCount,
      roadmapCompletedSteps,
      practiceSolved: user.practiceSolved || [],
      interviewSolved: user.interviewSolved || [],
      topicsCompleted: user.topicsCompleted,
      weeklyProgress: user.weeklyProgress,
      todayTasks: user.todayTasks,
      recommendedTopic,
      lastStudyContext: user.lastStudyContext || null,
      badges: user.badges,
      points: user.points,
      lastStudied: user.lastStudied,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PATCH /api/user/task-complete
router.patch("/task-complete", authMiddleware, async (req, res) => {
  try {
    const { taskId } = req.body;
    const user = await User.findById(req.user.id);

    user.todayTasks = user.todayTasks.map(task =>
      task.id === taskId
        ? { ...(typeof task.toObject === "function" ? task.toObject() : task), completed: true }
        : task
    );
    const doneTask = user.todayTasks.find((task) => task.id === taskId);
    updateDailyStudy(user, {
      type: doneTask?.type || "task",
      label: doneTask?.title || "Completed today's task",
      path: doneTask?.path || "/dashboard",
    });

    await user.save();
    res.json({ msg: "Task completed", streak: user.streak, points: user.points });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});



// PATCH /api/user/change-password
router.patch("/change-password", authMiddleware, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id);

    if (!user.password)
      return res.status(400).json({ msg: "Google login — no password to change" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Current password is incorrect" });

    if (newPassword.length < 6)
      return res.status(400).json({ msg: "New password must be at least 6 characters" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.json({ msg: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/user/reset-all
router.delete("/reset-all", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    await Progress.deleteMany({ userId });
    await QuizResult.deleteMany({ userId });
    await UserPractice.deleteMany({ userId });

    // reset user stats
    await User.findByIdAndUpdate(userId, {
      streak: 0,
      progressPercent: 0,
      questionsSolved: 0,
      topicsCompleted: 0,
      weeklyProgress: [0,0,0,0,0,0,0],
      lastStudied: null,
      points: 0,
      interviewSolved: [],
      practiceFavorites: [],
      practiceSolved: [],
      lastStudyContext: {
        type: "general",
        label: "",
        path: "",
        updatedAt: null,
      },
      badges: [],
      todayTasks: [],
      todayTasksDate: "",
    });

    res.json({ msg: "All progress reset successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.patch("/interview-solved", authMiddleware, async (req, res) => {
  try {
    const { questionId, solved = true, type = "technical", title = "Interview question" } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const key = `${type}:${questionId}`;
    const solvedSet = new Set(user.interviewSolved || []);
    if (solved) solvedSet.add(key);
    else solvedSet.delete(key);
    user.interviewSolved = Array.from(solvedSet);

    if (solved) {
      updateDailyStudy(user, {
        type: "interview",
        label: `Interview: ${title}`,
        path: `/interview/${type}`,
      });
    }

    await user.save();
    res.json({ interviewSolved: user.interviewSolved });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PATCH /api/user/update-profile
router.patch("/update-profile", authMiddleware, async (req, res) => {
  try {
    const { name, avatar, goal } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { ...(name && { name }), ...(avatar && { avatar }), ...(goal && { goal }) },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;