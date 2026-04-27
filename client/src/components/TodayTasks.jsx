import { completeTask } from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TodayTasks({ tasks, onUpdate }) {
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();

    const handleComplete = async (taskId) => {
        setLoading(taskId);
        try {
            await completeTask(taskId);
            onUpdate();
        } catch (err) {
            console.error(err);
        }
        setLoading(null);
    };

    return (
        <div className="rounded-[14px] p-5 border border-white/10 dark:bg-white/[0.03] bg-white">
            <h3 className="text-sm font-semibold dark:text-white text-gray-800 mb-4">
                🎯 Today's Tasks
            </h3>
            <div className="flex flex-col gap-3">
                {tasks?.map((task) => (
                    <div
                        key={task.id}
                        className="flex items-center justify-between gap-3 p-3 rounded-[10px] border border-white/5 dark:bg-white/[0.02] bg-gray-50"
                    >
                        <button
                            type="button"
                            onClick={() => task.path && navigate(task.path)}
                            className="flex items-center gap-3 text-left"
                        >
                            <div
                                className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                                style={{
                                    borderColor: task.completed ? '#10B981' : '#6C3EF4',
                                    background: task.completed ? '#10B981' : 'transparent'
                                }}
                            >
                                {task.completed && <span className="text-white text-xs">✓</span>}
                            </div>
                            <span
                                className={`text-sm ${task.completed
                                    ? 'line-through dark:text-white/30 text-gray-400'
                                    : 'dark:text-white/80 text-gray-700'}`}
                            >
                                {task.title}
                            </span>
                        </button>
                        {!task.completed && (
                            <button
                                onClick={() => handleComplete(task.id)}
                                disabled={loading === task.id}
                                className="text-xs px-3 py-1 rounded-full font-semibold text-white transition hover:opacity-80"
                                style={{ backgroundImage: 'linear-gradient(135deg, #6C3EF4, #3B8BFF)' }}
                            >
                                {loading === task.id ? "..." : "Done"}
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}