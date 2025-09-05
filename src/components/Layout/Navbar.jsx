import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  const linkBase =
    "px-3 py-2 rounded-lg text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10 transition";
  const linkActive =
    "bg-black/10 dark:bg-white/10";

  return (
    <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur dark:bg-zinc-900/70 dark:border-zinc-800">
      <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 shadow-soft" />
          <span className="font-bold text-lg bg-blue-400">
            S00010824 ToDo
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""} dark:text-white`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""} dark:text-white`
            }
          >
            Tasks
          </NavLink>

          <button
            onClick={() => setDark((v) => !v)}
            className="ml-2 rounded-xl px-3 py-2 text-sm font-medium border border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800 dark:text-white transition"
            title="Toggle dark mode"
          >
            {dark ? "🌙" : "☀️"}
          </button>
        </div>
      </nav>
    </header>
  );
}
