import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { openDB } from "idb"; // Import idb for IndexedDB
import authSlice from "./reducers/auth";
import api from "./api/api";

// Define IndexedDB storage for persistence
const indexedDBStorage = {
  getItem: async (key) => {
    const db = await openDB("my-database", 1, {
      upgrade(db) {
        db.createObjectStore("authStore");
      },
    });
    return db.get("authStore", key);
  },
  setItem: async (key, value) => {
    const db = await openDB("my-database", 1, {
      upgrade(db) {
        db.createObjectStore("authStore");
      },
    });
    return db.put("authStore", value, key);
  },
  removeItem: async (key) => {
    const db = await openDB("my-database", 1, {
      upgrade(db) {
        db.createObjectStore("authStore");
      },
    });
    return db.delete("authStore", key);
  },
};

const persistConfig = {
  key: "auth",
  storage: indexedDBStorage, // Use IndexedDB for storage
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["auth.questionID"],
      },
    }).concat(api.middleware),
});

export const persistor = persistStore(store);

export default store;
