// src/features/tasks/tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for fetching tasks from API
export const fetchTasks = createAsyncThunk("tasks/fetch", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=50");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return await res.json();
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    items: [],
    status: "idle",      // "idle" | "loading" | "succeeded" | "failed"
    error: null,
    query: "",           // search query string
    filter: "all",       // "all" | "completed" | "pending"
  },
  reducers: {
    // Action creators are auto-generated from these reducers
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    addTask: (state, action) => {
      const nextId = (state.items.at(-1)?.id || 0) + 1;
      state.items.unshift({ id: nextId, userId: 1, ...action.payload });
    },
    updateTask: (state, action) => {
      const { id, patch } = action.payload;
      const i = state.items.findIndex((t) => t.id === id);
      if (i > -1) state.items[i] = { ...state.items[i], ...patch };
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// ✅ Export the auto-generated action creators
export const { setQuery, setFilter, addTask, updateTask, deleteTask } =
  tasksSlice.actions;

// ✅ Export the reducer
export default tasksSlice.reducer;

