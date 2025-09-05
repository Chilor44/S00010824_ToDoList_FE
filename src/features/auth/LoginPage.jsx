import { useDispatch, useSelector } from "react-redux";
import { login } from "./authSlice";
import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loc = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  if (auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setErr("");
    try {
      dispatch(login({ username, password }));
      const from = loc.state?.from?.pathname || "/";
      navigate(from, { replace: true });
    } catch (e) {
      setErr(e.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto border rounded-2xl p-6 bg-white dark:bg-zinc-900 dark:border-zinc-800">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <p className="text-sm mb-4 text-zinc-600 dark:text-zinc-400">
        Try <span className="font-mono">admin / admin123</span> or <span className="font-mono">user / user123</span>
      </p>
      {err && <div className="mb-3 text-red-600">{err}</div>}
      <form onSubmit={onSubmit} className="space-y-3">
        <input
          className="w-full border rounded-lg p-2 dark:bg-zinc-900 dark:border-zinc-700"
          placeholder="Username"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full border rounded-lg p-2 dark:bg-zinc-900 dark:border-zinc-700"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
          Sign In
        </button>
      </form>
    </div>
  );
}
