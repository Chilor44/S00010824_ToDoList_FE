import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, setRole } from "../../auth/usersSlice";
import { useState } from "react";


export default function AdminDashboardPage() {
  const users = useSelector(s=>s.users);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [role, setRoleLocal] = useState("user");
  const [err, setErr] = useState("");

  const submit = (e)=>{
    e.preventDefault();
    if (!username.trim()) return setErr("Username is required");
    setErr("");
    dispatch(addUser({ username: username.trim(), role }));
    setUsername(""); setRoleLocal("user");
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      <form onSubmit={submit} className="flex flex-col md:flex-row gap-2 items-start">
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <input className="border rounded p-2" placeholder="New username" value={username} onChange={e=>setUsername(e.target.value)} />
        <select className="border rounded p-2" value={role} onChange={e=>setRoleLocal(e.target.value)}>
          <option value="user">Regular user</option>
          <option value="admin">Admin</option>
        </select>
        <button className="bg-blue-600 text-white rounded px-4 py-2">Add user</button>
      </form>

      <ul className="divide-y divide-zinc-200 dark:divide-zinc-800 rounded-xl border dark:border-zinc-800">
        {users.map(u=>(
          <li key={u.id} className="p-3 flex items-center justify-between">
            <div>
              <div className="font-medium">{u.username}</div>
              <div className="text-xs text-zinc-500">ID: {u.id}</div>
            </div>
            <div className="flex items-center gap-2">
              <select className="border rounded p-2" value={u.role} onChange={e=>dispatch(setRole({ id: u.id, role: e.target.value }))}>
                <option value="user">Regular</option>
                <option value="admin">Admin</option>
              </select>
              <button className="border rounded px-3 py-2" onClick={()=>dispatch(deleteUser(u.id))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
