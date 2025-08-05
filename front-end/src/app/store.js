import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import teamReducer from "../features/team/teamSlice";
import { charactersApi } from "../features/characters/charactersSlice";

// Combine reducers
const rootReducer = combineReducers({
  [charactersApi.reducerPath]: charactersApi.reducer,
  teams: teamReducer,
});

// Persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["teams"], // only persist 'teams'
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(charactersApi.middleware),
});

export const persistor = persistStore(store);
