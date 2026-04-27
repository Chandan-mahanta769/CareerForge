import { calculateScore } from "../utils/mockEngine";

export default function MockResult({ questions, answers }) {
  const results = questions.map((q, i) => {
    return calculateScore(answers[i] || "", q.expectedPoints);
  });

  const avg =
    results.reduce((a, b) => a + b, 0) / results.length;

  return (
    <div className="glass p-6 rounded-xl">
      <h2 className="text-2xl mb-4">Mock Result</h2>

      <p>Average Score: {Math.round(avg)}%</p>

      <ul className="mt-4">
        {results.map((r, i) => (
          <li key={i}>
            Q{i + 1}: {r}%
          </li>
        ))}
      </ul>
    </div>
  );
}