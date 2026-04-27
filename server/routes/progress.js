import express from "express";
import User from "../models/users.js";
import Progress from "../models/Progress.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ── Helpers ────────────────────────────────────────────────
const todayStr = () => new Date().toISOString().split("T")[0]; // "YYYY-MM-DD"

const getLast7Days = () => {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().split("T")[0]);
  }
  return days;
};

// Achievement definitions — auto-calculated
const ACHIEVEMENTS = [
  {
    id: "first_step",
    label: "First Step",
    emoji: "🚀",
    desc: "Completed your first roadmap step",
    check: (user, stepsCount) => stepsCount >= 1,
  },
  {
    id: "five_steps",
    label: "On a Roll",
    emoji: "⚡",
    desc: "Completed 5 roadmap steps",
    check: (user, stepsCount) => stepsCount >= 5,
  },
  {
    id: "ten_steps",
    label: "Dedicated Learner",
    emoji: "📚",
    desc: "Completed 10 roadmap steps",
    check: (user, stepsCount) => stepsCount >= 10,
  },
  {
    id: "streak_3",
    label: "3-Day Streak",
    emoji: "🔥",
    desc: "Practiced 3 days in a row",
    check: (user) => user.streak >= 3,
  },
  {
    id: "streak_7",
    label: "Week Warrior",
    emoji: "🌟",
    desc: "Maintained a 7-day streak",
    check: (user) => user.streak >= 7,
  },
  {
    id: "streak_30",
    label: "Unstoppable",
    emoji: "💎",
    desc: "30-day learning streak",
    check: (user) => user.streak >= 30,
  },
  {
    id: "practice_10",
    label: "Problem Solver",
    emoji: "🎯",
    desc: "Solved 10 practice questions",
    check: (user) => (user.practiceSolved || []).length >= 10,
  },
  {
    id: "practice_50",
    label: "Code Warrior",
    emoji: "⚔️",
    desc: "Solved 50 practice questions",
    check: (user) => (user.practiceSolved || []).length >= 50,
  },
  {
    id: "accuracy_80",
    label: "Accuracy King",
    emoji: "🏆",
    desc: "Achieved 80%+ overall accuracy",
    check: (user) => {
      const ta = user.topicAccuracy || [];
      if (!ta.length) return false;
      const total   = ta.reduce((s, t) => s + t.attempted, 0);
      const correct = ta.reduce((s, t) => s + t.correct, 0);
      return total > 0 && (correct / total) >= 0.8;
    },
  },
  {
    id: "all_rounder",
    label: "All Rounder",
    emoji: "🌈",
    desc: "Practiced 3+ different topics",
    check: (user) => {
      const ta = (user.topicAccuracy || []).filter(t => t.attempted > 0);
      return ta.length >= 3;
    },
  },
];

// ── Update streak on activity ──────────────────────────────
const updateStreak = (user) => {
  const today     = todayStr();
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const ydayStr   = yesterday.toISOString().split("T")[0];

  if (user.lastActiveDate === today) return; // already updated today

  if (user.lastActiveDate === ydayStr) {
    user.streak = (user.streak || 0) + 1;
  } else if (user.lastActiveDate !== today) {
    user.streak = 1; // reset
  }

  if (user.streak > (user.longestStreak || 0)) {
    user.longestStreak = user.streak;
  }

  user.lastActiveDate = today;
};

// ── Award new achievements ─────────────────────────────────
const awardAchievements = (user, stepsCount) => {
  const unlocked = (user.achievements || []).map(a => a.id);
  const newOnes  = [];

  for (const ach of ACHIEVEMENTS) {
    if (!unlocked.includes(ach.id) && ach.check(user, stepsCount)) {
      user.achievements.push({ id: ach.id, unlockedAt: new Date() });
      newOnes.push(ach.id);
    }
  }
  return newOnes;
};

// ── POST /api/progress/activity ────────────────────────────
// Called when user solves a practice question
// Body: { topic, correct }
router.post("/activity", authMiddleware, async (req, res) => {
  try {
    const { topic = "general", correct = false, questions = 1 } = req.body;
    const user  = await User.findById(req.user.id);
    const today = todayStr();

    // Update streak
    updateStreak(user);

    // Update daily activity
    const existing = user.dailyActivity.find(d => d.date === today);
    if (existing) {
      existing.questions += questions;
    } else {
      user.dailyActivity.push({ date: today, questions, steps: 0 });
    }

    // Update topic accuracy
    const topicEntry = user.topicAccuracy.find(t => t.topic === topic);
    if (topicEntry) {
      topicEntry.attempted += questions;
      if (correct) topicEntry.correct += 1;
    } else {
      user.topicAccuracy.push({
        topic,
        attempted: questions,
        correct: correct ? 1 : 0,
      });
    }

    // Award achievements
    const stepsCount = await Progress.countDocuments({ userId: user._id, completed: true });
    awardAchievements(user, stepsCount);

    await user.save();
    res.json({ streak: user.streak, ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ── POST /api/progress/step-complete ──────────────────────
// Called when a roadmap step is marked complete
router.post("/step-complete", authMiddleware, async (req, res) => {
  try {
    const user  = await User.findById(req.user.id);
    const today = todayStr();

    // Update streak
    updateStreak(user);

    // Log step in daily activity
    const existing = user.dailyActivity.find(d => d.date === today);
    if (existing) {
      existing.steps += 1;
    } else {
      user.dailyActivity.push({ date: today, questions: 0, steps: 1 });
    }

    // Count total steps and award achievements
    const stepsCount = await Progress.countDocuments({ userId: user._id, completed: true });
    awardAchievements(user, stepsCount + 1);

    await user.save();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// ── GET /api/progress/overview ─────────────────────────────
// Returns all data needed for the Progress page
router.get("/overview", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "name avatar goal streak longestStreak lastActiveDate dailyActivity topicAccuracy achievements practiceSolved practiceFavorites"
    );

    // ── Roadmap progress ──
    const allSteps = await Progress.find({ userId: user._id });
    const completedSteps = allSteps.filter(s => s.completed).length;
    const totalSteps     = allSteps.length;
    const roadmapPct     = totalSteps > 0
      ? Math.round((completedSteps / totalSteps) * 100)
      : 0;

    // ── Weekly activity (last 7 days) ──
    const last7 = getLast7Days();
    const weeklyGraph = last7.map(date => {
      const entry = user.dailyActivity.find(d => d.date === date);
      return {
        date,
        label: new Date(date).toLocaleDateString("en-US", { weekday: "short" }),
        questions: entry?.questions || 0,
        steps:     entry?.steps || 0,
      };
    });

    // ── Streak calendar (last 30 days) ──
    const last30 = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const ds = d.toISOString().split("T")[0];
      const entry = user.dailyActivity.find(a => a.date === ds);
      last30.push({
        date:   ds,
        active: !!(entry && (entry.questions > 0 || entry.steps > 0)),
      });
    }

    // ── Overall accuracy ──
    const ta      = user.topicAccuracy || [];
    const totAtt  = ta.reduce((s, t) => s + t.attempted, 0);
    const totCorr = ta.reduce((s, t) => s + t.correct, 0);
    const accuracy = totAtt > 0 ? Math.round((totCorr / totAtt) * 100) : 0;

    // ── Weak areas (accuracy < 50% OR 0 questions) ──
    const weakAreas = ta
      .filter(t => t.attempted > 0 && (t.correct / t.attempted) < 0.5)
      .map(t => ({
        topic:    t.topic,
        accuracy: Math.round((t.correct / t.attempted) * 100),
        attempted: t.attempted,
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 4);

    // ── Topics practiced ──
    const topicsPracticed = ta
      .filter(t => t.attempted > 0)
      .map(t => ({
        topic:    t.topic,
        accuracy: Math.round((t.correct / t.attempted) * 100),
        solved:   t.correct,
        attempted: t.attempted,
      }));

    // ── Achievements with metadata ──
    const unlockedIds = (user.achievements || []).map(a => a.id);
    const achievementsWithMeta = ACHIEVEMENTS.map(ach => ({
      ...ach,
      unlocked:    unlockedIds.includes(ach.id),
      unlockedAt:  user.achievements.find(a => a.id === ach.id)?.unlockedAt || null,
      check:       undefined, // don't send function to client
    }));

    // ── Current path ──
    const mostRecentStep = await Progress.findOne({ userId: user._id, completed: true })
      .sort({ updatedAt: -1 });

    // ── Next action ──
    const nextIncomplete = await Progress.findOne({ userId: user._id, completed: false })
      .sort({ createdAt: 1 });

    res.json({
      user: {
        name:   user.name,
        avatar: user.avatar,
        goal:   user.goal,
      },
      streak: {
        current:  user.streak || 0,
        longest:  user.longestStreak || 0,
        lastActive: user.lastActiveDate || null,
        calendar: last30,
      },
      roadmap: {
        completed: completedSteps,
        total:     totalSteps,
        percent:   roadmapPct,
        currentPath: user.goal || "Web Development",
        recentStep:  mostRecentStep?.stepId || null,
        nextStep:    nextIncomplete?.stepId || null,
      },
      practice: {
        solved:    (user.practiceSolved || []).length,
        favorites: (user.practiceFavorites || []).length,
      },
      accuracy,
      topicsPracticed,
      weakAreas,
      weeklyGraph,
      achievements: achievementsWithMeta,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;