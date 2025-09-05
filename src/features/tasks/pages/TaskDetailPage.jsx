import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function TaskDetailPage() {
  const { id } = useParams();
  const task = useSelector(s => s.tasks.items.find(t => String(t.id) === id));
  if (!task) return <div className="text-zinc-600">Task not found.</div>;
  return (
    <div className="space-y-3">
      <Link to="/tasks" className="text-blue-600">&larr; Back</Link>
      <h1 className="text-2xl font-bold">{task.title}</h1>
      <p className="text-sm text-zinc-600">Task ID: {task.id} • User ID: {task.userId}</p>
      <span className={`inline-block px-2 py-1 text-xs rounded-full ${task.completed ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
        {task.completed ? "Completed" : "Pending"}
      </span>
    </div>
  );
}
