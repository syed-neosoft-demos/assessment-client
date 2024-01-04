import { configureStore } from "@reduxjs/toolkit";

import resumeReducer from "./features/resume/resumeSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    resume: resumeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ["resume/editingAbout"],
        // Ignore these paths in the state
        ignoredPaths: ["resume.editingResume.about", "resume.editingResume.about.image"],
      },
    }),
});
export default store;
