import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

// Redux slice actions/thunks
import {
  fetchTasks,     // async: fetch from JSONPlaceholder
  setFilter,      // "all" | "completed" | "pending"
  setQuery,       // search text
  addTask,        // local create
  updateTask,     // local update
  deleteTask,     // local delete
} from "../../tasks/tasksSlice";

// Reusable UI
import Spinner from "../../../components/Spinner";
import SearchBar from "../../../components/SearchBar";
import TaskForm from "../components/TaskForm";

/**
 * TasksPage
 * - Fetches tasks on first load
 * - Provides search + filter + client-side pagination
 * - Shows loading/error states
 * - Renders grid of task cards with: View (to /task/:id), Edit, Delete
 * - Offers Add Task, Edit Task, and Delete confirmation modals
 */
export default function TasksPage() {
  const dispatch = useDispatch();

  // Select tasks state from Redux
  const { items, status, error, query, filter } = useSelector((s) => s.tasks);

  // Local UI state (modals + pagination)
  const [showAdd, setShowAdd] = useState(false);      // "Add Task" modal
  const [editing, setEditing] = useState(null);       // task object being edited
  const [confirmDelete, setConfirmDelete] = useState(null); // id of task to delete
  const [page, setPage] = useState(1);                // current page for pagination
  const pageSize = 9;                                 // items per page

  // 1) Fetch tasks on first load (status === "idle" avoids re-fetching)
  useEffect(() => {
    if (status === "idle") dispatch(fetchTasks());
  }, [status, dispatch]);

  // 2) Derive filtered list based on Redux `filter` + `query`
  //    useMemo avoids re-computation on unrelated state changes
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      // filter by status
      .filter((t) =>
        filter === "completed" ? t.completed :
        filter === "pending"   ? !t.completed :
        true
      )
      // filter by search query in title
      .filter((t) => (q ? String(t.title).toLowerCase().includes(q) : true));
  }, [items, query, filter]);

  // 3) Apply client-side pagination on top of the filtered array
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page]);

  // Ensure current page stays valid if filters/search reduce the list
  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  return (
    <div className="space-y-4">
      {/* Title */}
      <h2 className="text-2xl font-semibold">Tasks</h2>

      {/* Controls row: Search + Filter buttons + Add Task */}
      <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
        {/* Search (updates Redux) */}
        <SearchBar
          value={query}
          onChange={(v) => {
            setPage(1);            // reset to first page on new search
            dispatch(setQuery(v));
          }}
          placeholder="Search tasks by title..."
        />

        {/* Filter chips (updates Redux) */}
        <div className="flex gap-2">
          <button
            className={`px-3 py-2 rounded-lg border text-sm transition ${
              filter === "all"
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
            onClick={() => {
              setPage(1);
              dispatch(setFilter("all"));
            }}
          >
            All
          </button>

          <button
            className={`px-3 py-2 rounded-lg border text-sm transition ${
              filter === "completed"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
            onClick={() => {
              setPage(1);
              dispatch(setFilter("completed"));
            }}
          >
            Completed
          </button>

          <button
            className={`px-3 py-2 rounded-lg border text-sm transition ${
              filter === "pending"
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800"
            }`}
            onClick={() => {
              setPage(1);
              dispatch(setFilter("pending"));
            }}
          >
            Pending
          </button>
        </div>

        {/* Add Task opens modal */}
        <button
          onClick={() => setShowAdd(true)}
          className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Task
        </button>
      </div>

      {/* Async states */}
      {status === "loading" && <Spinner />}
      {status === "failed" && <div className="text-red-600">Error: {error}</div>}

      {/* Content when fetch succeeded */}
      {status === "succeeded" && (
        <>
          {/* Result summary + pagination controls */}
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Showing <span className="font-medium">{paged.length}</span> of{" "}
              <span className="font-medium">{filtered.length}</span> filtered tasks
              {query ? (
                <>
                  {" "}for query <span className="font-mono">"{query}"</span>
                </>
              ) : null}
              .
            </p>

            {/* Simple Prev/Next pagination */}
            <div className="flex items-center gap-2">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="px-3 py-1.5 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm">
                Page {page} / {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="px-3 py-1.5 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          {/* Grid of task cards */}
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {paged.map((t) => (
              <li
                key={t.id}
                className="group border border-zinc-200 dark:border-zinc-800 rounded-2xl p-4 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition"
              >
                {/* Card header: title + status badge */}
                <div className="flex items-start justify-between">
                  <h3 className="font-semibold pr-2 text-zinc-900 dark:text-zinc-100 line-clamp-2">
                    {t.title}
                  </h3>
                  <span
                    className={`ml-2 shrink-0 inline-block px-2 py-1 text-[11px] rounded-full border ${
                      t.completed
                        ? "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-900"
                        : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-900"
                    }`}
                  >
                    {t.completed ? "Completed" : "Pending"}
                  </span>
                </div>

                {/* Meta row */}
                <div className="mt-3 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-1">
                    <span className="opacity-60">Task</span>
                    <span className="font-mono">{t.id}</span>
                  </span>
                  <span className="opacity-30">•</span>
                  <span className="inline-flex items-center gap-1">
                    <span className="opacity-60">User</span>
                    <span className="font-mono">{t.userId}</span>
                  </span>
                </div>

                {/* Actions: View (detail route), Edit, Delete */}
                <div className="mt-4 flex gap-2">
                  {/* Dynamic route to detail page */}
                  <Link
                    to={`/task/${t.id}`}
                    className="px-3 py-1.5 rounded-lg text-xs border dark:border-zinc-700 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                  >
                    View
                  </Link>

                  {/* Open Edit modal with current task */}
                  <button
                    onClick={() => setEditing(t)}
                    className="px-3 py-1.5 rounded-lg text-xs border dark:border-zinc-700 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                  >
                    Edit
                  </button>

                  {/* Open Delete confirm modal with current id */}
                  <button
                    onClick={() => setConfirmDelete(t.id)}
                    className="px-3 py-1.5 rounded-lg text-xs border dark:border-zinc-700 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-800 transition"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* ===== Modals ===== */}

      {/* Add Task modal */}
      {showAdd && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">New Task</h3>
            <TaskForm
              onSubmit={(data) => {
                // Local add; JSONPlaceholder won't persist
                dispatch(addTask(data));
                setShowAdd(false);
                // Optional: reset to first page to see the new task quickly
                setPage(1);
              }}
            />
            <div className="mt-3 text-right">
              <button
                className="border rounded px-3 py-2 dark:border-zinc-700"
                onClick={() => setShowAdd(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Task modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-3">Edit Task</h3>
            <TaskForm
              initial={editing}
              onSubmit={(data) => {
                dispatch(updateTask({ id: editing.id, patch: data }));
                setEditing(null);
              }}
            />
            <div className="mt-3 text-right">
              <button
                className="border rounded px-3 py-2 dark:border-zinc-700"
                onClick={() => setEditing(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 w-full max-w-sm">
            <p className="mb-4">Delete this task?</p>
            <div className="flex gap-2">
              <button
                className="bg-red-600 text-white rounded px-3 py-2"
                onClick={() => {
                  dispatch(deleteTask(confirmDelete));
                  setConfirmDelete(null);
                }}
              >
                Delete
              </button>
              <button
                className="border rounded px-3 py-2 dark:border-zinc-700"
                onClick={() => setConfirmDelete(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
