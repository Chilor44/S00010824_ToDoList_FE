// React Router imports
import { Routes, Route, NavLink } from "react-router-dom";

// Importing pages
import HomePage from "../pages/HomePage";
import TasksPage from "../features/tasks/pages/TasksPage";
import TaskDetailPage from "../features/tasks/pages/TaskDetailPage";
import NotFoundPage from "../pages/NotFoundPage";
import AdminDashboardPage from "../features/tasks/pages/AdminDashboardPage";
import LoginPage from "../features/auth/LoginPage";
import ProfilePage from "../features/auth/ProfilePage";

// Importing wrapper for protected routes (role-based guard)
import Protected from "../components/Layout/Protected";

// Redux imports for auth state and logout
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

export default function AppRoutes() {
  // Access authentication state from Redux
  const auth = useSelector((s) => s.auth);
  // Dispatcher to trigger logout
  const dispatch = useDispatch();

  return (
    <>
      {/* NAVBAR - persistent across all pages */}
      <header className="sticky top-0 z-10 border-b bg-white/70 backdrop-blur dark:bg-zinc-900/70 dark:border-zinc-800">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          
          {/* LEFT SIDE: Navigation links */}
          <div className="flex items-center gap-2">
            {/* Home link with project title */}
            <NavLink to="/" className="font-bold text-lg dark:text-white">
              S00010824 ToDo
            </NavLink>

            {/* Tasks listing page */}
            <NavLink
              to="/tasks"
              className="px-3 py-2 rounded-lg text-sm hover:bg-black/5 dark:hover:bg-white/10 dark:text-white"
            >
              Tasks
            </NavLink>

            {/* Admin dashboard link (only visible link; access guarded below) */}
            <NavLink
              to="/admin"
              className="px-3 py-2 rounded-lg text-sm hover:bg-black/5 dark:hover:bg-white/10 dark:text-white"
            >
              Admin
            </NavLink>
          </div>

          {/* RIGHT SIDE: Auth buttons */}
          <div className="flex items-center gap-2">
            {auth.isAuthenticated ? (
              // If logged in, show username, role, profile and logout
              <>
                <span className="text-sm dark:text-white">
                  {auth.username} • <span className="uppercase">{auth.role}</span>
                </span>
                <NavLink
                  to="/profile"
                  className="px-3 py-2 rounded-lg text-sm border dark:border-zinc-700 dark:text-white"
                >
                  Profile
                </NavLink>
                <button
                  onClick={() => dispatch(logout())}
                  className="px-3 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"
                >
                  Logout
                </button>
              </>
            ) : (
              // If not logged in, show login link
              <NavLink
                to="/login"
                className="px-3 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-700"
              >
                Login
              </NavLink>
            )}
          </div>
        </nav>
      </header>

      {/* MAIN ROUTING AREA */}
      <main className="max-w-6xl mx-auto p-4 md:p-6 dark:text-zinc-100">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/task/:id" element={<TaskDetailPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes (require login) */}
          <Route
            path="/profile"
            element={
              <Protected>
                <ProfilePage />
              </Protected>
            }
          />

          {/* Admin-only route (requires login + role = admin) */}
          <Route
            path="/admin"
            element={
              <Protected role="admin">
                <AdminDashboardPage />
              </Protected>
            }
          />

          {/* Catch-all route for 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* FOOTER - always visible */}
      <footer className="border-t mt-10 py-6 text-xs text-zinc-500 dark:text-zinc-400 dark:border-zinc-800">
        <div className="max-w-6xl mx-auto px-4">
          Built with React + Tailwind • Exam project
        </div>
      </footer>
    </>
  );
}
