import { configureStore } from "@reduxjs/toolkit";

import tasks from "./slices/tasks";
import registerData from "./slices/registerData";

export const store = configureStore({
  reducer: {
    tasks,
    registerData,
  },
});
