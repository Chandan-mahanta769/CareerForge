import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import passport from "./config/passport.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import progressRoutes from "./routes/progress.js";
import topicRoutes from "./routes/topics.js";
import practiceRoutes from "./routes/practice.js";
import courseRoutes from "./routes/courses.js";

dotenv.config();

const CLIENT_URL = process.env.CLIENT_URL || "https://career-forge-new.vercel.app";
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({ origin: CLIENT_URL, credentials: true }));
// app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/practice", practiceRoutes);
app.use("/api/courses", courseRoutes);

app.get("/", (req, res) => res.send("API is Running"));



const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/careerforge";

mongoose.connect(mongoUri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


