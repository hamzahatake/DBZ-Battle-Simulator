import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import teamReducer from "../features/teams/teamsSlice";
import { charactersApi } from "../features/characters/charactersSlice";
import authReducer from '../features/auth/authSlice';
import { userProfileApi } from "../auth/userProfileSlice";
import { api } from "../services/api";
import { teamsPersistenceMiddleware, loadTeamsFromStorage } from "../features/teams/teamsPersistence";

const rootReducer = combineReducers({
  teams: teamReducer,
  auth: authReducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
  [userProfileApi.reducerPath]: userProfileApi.reducer,
  [api.reducerPath]: api.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["teams"], // persist only 'teams'
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Load preloaded state from localStorage
const preloadedTeams = loadTeamsFromStorage();
const preloadedState = preloadedTeams ? { teams: preloadedTeams } : undefined;

export const store = configureStore({
  reducer: persistedReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(charactersApi.middleware)
      .concat(userProfileApi.middleware)
      .concat(api.middleware)
      .concat(teamsPersistenceMiddleware),
});

export const persistor = persistStore(store);
