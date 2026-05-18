import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import sessionReducer from "./session/sessionSlice";
import uiReducer from "./ui/uiSlice";

const rootReducer = combineReducers({
  session: sessionReducer,
  ui: uiReducer,
});

type RootReducerState = ReturnType<typeof rootReducer>;
type PersistedRootState = Partial<RootReducerState> & {
  _persist?: {
    version: number;
    rehydrated: boolean;
  };
};

export function removePersistedSession(
  state: PersistedRootState | undefined
): PersistedRootState | undefined {
  if (!state) return state;

  const stateWithoutSession: PersistedRootState = { ...state };
  delete stateWithoutSession.session;
  return stateWithoutSession;
}

export const persistConfig: PersistConfig<RootReducerState> = {
  key: "root",
  storage,
  blacklist: ["session"],
  migrate: (state) => {
    const migratedState = removePersistedSession(
      state as PersistedRootState | undefined
    );
    return Promise.resolve(migratedState as typeof state);
  },
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
