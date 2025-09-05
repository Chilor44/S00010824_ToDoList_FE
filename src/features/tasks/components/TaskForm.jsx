import { useState } from "react";

export default function TaskForm({ initial = { title: "", completed: false }, onSubmit }) {
  const [title, setTitle] = useState(initial.title);
  const [completed, setCompleted] = useState(!!initial.completed);
  const [err, setErr] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!title.trim()) return setErr("Title is required");
    setErr(""); onSubmit({ title: title.trim(), completed });
  };
  return (
    <form onSubmit={submit} className="space-y-3">
      {err && <div className="text-red-600 text-sm">{err}</div>}
      <input className="w-full border rounded p-2" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Task title" />
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={completed} onChange={e=>setCompleted(e.target.checked)} />
        Completed
      </label>
      <button className="bg-blue-600 text-white rounded px-4 py-2">Save</button>
    </form>
  );
}
