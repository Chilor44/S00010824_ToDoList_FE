import { createSlice } from "@reduxjs/toolkit";

const saved = (() => {
  try {
    const raw = localStorage.getItem("auth");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
})();

const initialState = saved || {
  isAuthenticated: false,
  username: null,
  role: null, // "admin" | "user"
};

const USERS = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "user",  password: "user123",  role: "user"  },
];

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, password } = action.payload;
      const found = USERS.find(u => u.username === username && u.password === password);
      if (!found) {
        throw new Error("Invalid credentials");
      }
      state.isAuthenticated = true;
      state.username = found.username;
      state.role = found.role;
      localStorage.setItem("auth", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.role = null;
      localStorage.removeItem("auth");
    },
    updateProfile: (state, action) => {
      const { username } = action.payload;
      state.username = username;
      localStorage.setItem("auth", JSON.stringify(state));
    }
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
