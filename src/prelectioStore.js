import { configureStore } from "@reduxjs/toolkit";
import athleteSlice from "./parts/athleteSlice";

export default configureStore({
  reducer: {
    athlete: athleteSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
