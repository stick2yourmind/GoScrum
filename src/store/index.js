import { configureStore } from "@reduxjs/toolkit";
import tasks from "./slices/tasks";

export const store = configureStore({
  reducer: {
    tasks,
  },
});
