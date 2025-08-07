import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import teamReducer from "../features/team/teamSlice";
import { charactersApi } from "../features/characters/charactersSlice";
import authReducer from '../auth/authSlice';

const rootReducer = combineReducers({
  teams: teamReducer,
  auth: authReducer,
  [charactersApi.reducerPath]: charactersApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["teams"], // persist only 'teams'
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(charactersApi.middleware),
});

export const persistor = persistStore(store);
