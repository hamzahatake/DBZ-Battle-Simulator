import { configureStore } from "@reduxjs/toolkit";
import { charactersApi } from "../features/characters/charactersSlice";
import teamReducer from "../features/team/teamSlice";

export const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
    teams: teamReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(charactersApi.middleware),
});
