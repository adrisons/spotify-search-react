import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  createMigrate,
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  type MigrationManifest,
  type PersistConfig,
  type PersistedState,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionReducer from "./session/sessionSlice";
import uiReducer from "./ui/uiSlice";

const rootReducer = combineReducers({
  session: sessionReducer,
  ui: uiReducer,
});

type PersistedRootState = Partial<ReturnType<typeof rootReducer>> & {
  _persist?: {
    version: number;
    rehydrated: boolean;
  };
};

function stripPersistedSession(state: PersistedState): PersistedState {
  if (!state) return state;

  const rest = { ...(state as PersistedRootState) };
  delete rest.session;
  return rest as PersistedState;
}

export const migrations: MigrationManifest = {
  1: stripPersistedSession,
};

export const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: "root",
  storage,
  version: 1,
  blacklist: ["session"],
  migrate: createMigrate(migrations, { debug: false }),
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
