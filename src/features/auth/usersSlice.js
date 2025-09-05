import { createSlice } from "@reduxjs/toolkit";

const saved = JSON.parse(localStorage.getItem("users") || "[]");
const initial = saved.length ? saved : [
  { id: 1, username: "admin", role: "admin" },
  { id: 2, username: "user",  role: "user"  },
];

const usersSlice = createSlice({
  name: "users",
  initialState: initial,
  reducers: {
    addUser: (state, action) => {
      const { username, role } = action.payload;
      const id = (state.at(-1)?.id || 0) + 1;
      state.push({ id, username, role });
      localStorage.setItem("users", JSON.stringify(state));
    },
    deleteUser: (state, action) => {
      const next = state.filter(u => u.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(next));
      return next;
    },
    setRole: (state, action) => {
      const { id, role } = action.payload;
      const i = state.findIndex(u => u.id === id);
      if (i > -1) state[i].role = role;
      localStorage.setItem("users", JSON.stringify(state));
    }
  }
});

export const { addUser, deleteUser, setRole } = usersSlice.actions;
export default usersSlice.reducer;
