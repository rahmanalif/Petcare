import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import authReducer from './authSlice';
import serviceReducer from './serviceSlice'; // <-- import your boarding/service slice

// --- Combine reducers ---
const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer, // <-- add service slice here
});

// --- Persist configuration ---
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'service'], // persist both auth & service if you want
};

// --- Create persisted reducer ---
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- Configure store ---
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);