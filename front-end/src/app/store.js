import { configureStore } from "@reduxjs/toolkit";
import { charactersApi } from "../features/characters/charactersSlice"; // adjust path

export const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});
