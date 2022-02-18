import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionReducer from "./session/session.reducer";
import uiReducer from "./ui/ui.reducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  ui: uiReducer,
  session: sessionReducer
});

export default persistReducer(persistConfig, rootReducer);
