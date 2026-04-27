export default function MockQuestionCard({ question, index, total, time }) {
  return (
    <div className="glass p-6 rounded-xl mb-6">
      <p className="text-sm opacity-70">
        Question {index + 1} / {total}
      </p>

      <h2 className="text-xl font-semibold mt-2">
        {question.question}
      </h2>

      <p className="mt-4 text-orange-400">
        ⏱ {time}s
      </p>
    </div>
  );
}