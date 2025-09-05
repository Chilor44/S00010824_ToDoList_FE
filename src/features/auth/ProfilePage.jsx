import { useDispatch, useSelector } from "react-redux";
import { updateProfile, logout } from "./authSlice";
import { useState } from "react";

export default function ProfilePage() {
  const auth = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const [username, setUsername] = useState(auth.username || "");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    dispatch(updateProfile({ username: username.trim() }));
  };

  return (
    <div className="max-w-md mx-auto border rounded-2xl p-6 bg-white dark:bg-zinc-900 dark:border-zinc-800">
      <h1 className="text-2xl font-bold mb-2">Profile</h1>
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Role: <span className="font-semibold">{auth.role}</span>
      </p>

      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block text-sm">Username</label>
        <input
          className="w-full border rounded-lg p-2 dark:bg-zinc-900 dark:border-zinc-700"
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <button className="w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
          Save new username
        </button>
      </form>

      <button
        className="mt-4 w-full border rounded-lg py-2 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
        onClick={()=>dispatch(logout())}
      >
        Log out
      </button>
    </div>
  );
}
