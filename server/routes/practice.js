import express from "express";
import User from "../models/users.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();
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
  user.points += 3;
  user.lastStudyContext = {
    type: context.type || "practice",
    label: context.label || "Practice question solved",
    path: context.path || "/practice",
    updatedAt: new Date(),
  };
};

// GET user practice data
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("practiceFavorites practiceSolved");
    res.json({
      favorites: user.practiceFavorites || [],
      solved: user.practiceSolved || [],
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PATCH toggle favorite
router.patch("/favorite", authMiddleware, async (req, res) => {
  try {
    const { questionId, topic = "general" } = req.body;
    const user = await User.findById(req.user.id);
    const key = `${topic}:${questionId}`;
    const favorites = user.practiceFavorites || [];
    
    if (favorites.includes(key)) {
      user.practiceFavorites = favorites.filter(id => id !== key);
    } else {
      user.practiceFavorites = [...favorites, key];
    }
    
    await user.save();
    res.json({ favorites: user.practiceFavorites });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PATCH toggle solved
router.patch("/solved", authMiddleware, async (req, res) => {
  try {
    const { questionId, topic = "general", title = "Question", solved: solvedFlag = null } = req.body;
    const user = await User.findById(req.user.id);
    const key = `${topic}:${questionId}`;
    const solvedList = user.practiceSolved || [];

    const shouldSolve = typeof solvedFlag === "boolean" ? solvedFlag : !solvedList.includes(key);
    if (!shouldSolve && solvedList.includes(key)) {
      user.practiceSolved = solvedList.filter(id => id !== key);
    } else {
      user.practiceSolved = Array.from(new Set([...solvedList, key]));
      updateDailyStudy(user, {
        type: "practice",
        label: `${topic.toUpperCase()}: ${title}`,
        path: "/practice",
      });
    }
    
    await user.save();
    res.json({ solved: user.practiceSolved });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;