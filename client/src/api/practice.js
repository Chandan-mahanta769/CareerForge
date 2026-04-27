const BASE = import.meta.env.VITE_API_URL + "/api";

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export const getQuestions = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/practice/questions?${query}`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch questions");
  return res.json();
};

export const getPracticeTopics = async () => {
  const res = await fetch(`${BASE}/practice/topics`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch topics");
  return res.json();
};

export const updatePractice = async (questionId, data) => {
  const res = await fetch(`${BASE}/practice/update`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ questionId, ...data }),
  });
  if (!res.ok) throw new Error("Failed to update");
  return res.json();
};

export const getPracticeStats = async () => {
  const res = await fetch(`${BASE}/practice/stats`, { headers: headers() });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
};