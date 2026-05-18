import { configureStore, combineReducers, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  type PersistConfig,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionReducer, { logout } from "./session/sessionSlice";
import uiReducer from "./ui/uiSlice";

const listenerMiddleware = createListenerMiddleware();

const rootReducer = combineReducers({
  session: sessionReducer,
  ui: uiReducer,
});

export const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);

listenerMiddleware.startListening({
  matcher: isAnyOf(logout),
  effect: async () => {
    await persistor.purge();
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
