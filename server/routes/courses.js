import express from "express";
import Course from "../models/Course.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET all courses (sorted by order)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const courses = await Course.find().sort({ order: 1 });
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET single course by id
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const course = await Course.findOne({ id: req.params.id });
    if (!course) return res.status(404).json({ msg: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// POST create course
router.post("/", authMiddleware, async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PATCH update course (add track/stack/toggle locked)
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    console.log(req.body)
    const course = await Course.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Course.findOneAndDelete({ id: req.params.id });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

export default router;