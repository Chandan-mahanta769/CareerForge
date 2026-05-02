const apiBase = import.meta.env.VITE_API_BASE || import.meta.env.VITE_API_URL;
const resolvedApiBase = apiBase
  ? apiBase.replace(/\/$/, "") + (import.meta.env.VITE_API_BASE ? "" : "/api")
  : "http://localhost:5000/api";
const BASE = typeof window !== "undefined" && window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : resolvedApiBase;

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const getUserStats = async () => {
  const res = await fetch(`${BASE}/user/stats`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
};

export const getUserProfile = async () => {
  const res = await fetch(`${BASE}/user/profile`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch profile");
  return res.json();
};

export const completeTask = async (taskId) => {
  const res = await fetch(`${BASE}/user/task-complete`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ taskId }),
  });
  if (!res.ok) throw new Error("Failed to complete task");
  return res.json();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error("Login failed");
  return res.json();
};

export const signupUser = async (name, email, password) => {
  const res = await fetch(`${BASE}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
};

export const getStackProgress = async (categoryId, trackId, stackId) => {
  const res = await fetch(
    `${BASE}/progress/${categoryId}/${trackId}/${stackId}`,
    { headers: headers() }
  );
  if (!res.ok) throw new Error("Failed to fetch progress");
  return res.json();
};

export const updateStepProgress = async (categoryId, trackId, stackId, stepId, completed) => {
  const res = await fetch(`${BASE}/progress/step`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ categoryId, trackId, stackId, stepId, completed }),
  });
  if (!res.ok) throw new Error("Failed to update progress");
  return res.json();
};

export const getTopic = async (categoryId, trackId, stackId, stepId) => {
  const res = await fetch(
    `${BASE}/topics/${categoryId}/${trackId}/${stackId}/${stepId}`,
    { headers: headers() }
  );
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Failed to fetch topic");
  return res.json();
};

export const submitQuiz = async (topicId, stepId, stackId, answers) => {
  const res = await fetch(`${BASE}/topics/quiz/submit`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ topicId, stepId, stackId, answers }),
  });
  if (!res.ok) throw new Error("Failed to submit quiz");
  return res.json();
};

export const getQuizResult = async (topicId) => {
  const res = await fetch(`${BASE}/topics/quiz/result/${topicId}`, {
    headers: headers()
  });
  if (!res.ok) throw new Error("Failed to fetch quiz result");
  return res.json();
};

export const changePassword = async (currentPassword, newPassword) => {
  const res = await fetch(`${BASE}/user/change-password`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.msg || "Failed to change password");
  }
  return res.json();
};

export const resetAllProgress = async () => {
  const res = await fetch(`${BASE}/user/reset-all`, {
    method: "DELETE",
    headers: headers(),
  });
  if (!res.ok) throw new Error("Failed to reset progress");
  return res.json();
};

export const updateProfile = async (data) => {
  const res = await fetch(`${BASE}/user/update-profile`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update profile");
  return res.json();
};

export const getCourses = async () => {
  const res = await fetch(`${BASE}/courses`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch courses");
  return res.json();
};

export const getCourse = async (id) => {
  const res = await fetch(`${BASE}/courses/${id}`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch course");
  return res.json();
};

export const getPracticeStats = async () => {
  const res = await fetch(`${BASE}/practice/stats`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch practice stats");
  return res.json();
};

export const togglePracticeFavorite = async (questionId, topic = "general") => {
  const res = await fetch(`${BASE}/practice/favorite`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ questionId, topic }),
  });
  if (!res.ok) throw new Error("Failed to toggle favorite");
  return res.json();
};

export const togglePracticeSolved = async (questionId, topic = "general", title = "Question", solved = null) => {
  const res = await fetch(`${BASE}/practice/solved`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ questionId, topic, title, solved }),
  });
  if (!res.ok) throw new Error("Failed to toggle solved");
  return res.json();
};

export const toggleInterviewSolved = async ({ questionId, solved, type, title }) => {
  const res = await fetch(`${BASE}/user/interview-solved`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ questionId, solved, type, title }),
  });
  if (!res.ok) throw new Error("Failed to update interview progress");
  return res.json();
};


// Get full progress overview for Progress page
export const getProgressOverview = async () => {
  const res = await fetch(`${BASE}/progress/overview`, {
    headers: headers(),
  });
  if (!res.ok) throw new Error("Failed to fetch progress overview");
  return res.json();
};

// Log practice activity (call when user marks question solved)
export const logPracticeActivity = async (topic, correct = false, questions = 1) => {
  const res = await fetch(`${BASE}/progress/activity`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ topic, correct, questions }),
  });
  if (!res.ok) throw new Error("Failed to log activity");
  return res.json();
};

// Log step completion (call when roadmap step is marked complete)
export const logStepComplete = async () => {
  const res = await fetch(`${BASE}/progress/step-complete`, {
    method: "POST",
    headers: headers(),
  });
  if (!res.ok) throw new Error("Failed to log step");
  return res.json();
};