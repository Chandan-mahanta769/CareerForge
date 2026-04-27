import express from "express";
import Topic from "../models/Topic.js";
import QuizResult from "../models/QuizResult.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET topic by stepId + stackId + trackId + categoryId
router.get("/:categoryId/:trackId/:stackId/:stepId", authMiddleware, async (req, res) => {
  try {
    const { categoryId, trackId, stackId, stepId } = req.params;
    const topic = await Topic.findOne({ categoryId, trackId, stackId, stepId });
    if (!topic) return res.status(404).json({ msg: "Topic not found" });
    res.json(topic);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST create/update topic (admin use)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { categoryId, trackId, stackId, stepId } = req.body;
    let topic = await Topic.findOne({ categoryId, trackId, stackId, stepId });
    if (topic) {
      Object.assign(topic, req.body);
      await topic.save();
    } else {
      topic = await Topic.create(req.body);
    }
    res.json(topic);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST submit quiz
router.post("/quiz/submit", authMiddleware, async (req, res) => {
  try {
    const { topicId, stepId, stackId, answers } = req.body;

    const topic = await Topic.findById(topicId);
    if (!topic) return res.status(404).json({ msg: "Topic not found" });

    let score = 0;
    const evaluated = answers.map(ans => {
      const q = topic.quiz.find(q => q.question === ans.question);
      const isCorrect = q && q.correct === ans.selected;
      if (isCorrect) score++;
      return {
        question: ans.question,
        selected: ans.selected,
        correct: q?.correct,
        isCorrect,
      };
    });

    const total = topic.quiz.length;
    const percent = Math.round((score / total) * 100);

    // Save result
    await QuizResult.create({
      userId: req.user.id,
      topicId,
      stepId,
      stackId,
      score,
      total,
      percent,
      answers: evaluated,
    });

    res.json({ score, total, percent, answers: evaluated });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET last quiz result for a topic
router.get("/quiz/result/:topicId", authMiddleware, async (req, res) => {
  try {
    const result = await QuizResult.findOne({
      userId: req.user.id,
      topicId: req.params.topicId,
    }).sort({ createdAt: -1 });
    res.json(result || null);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;