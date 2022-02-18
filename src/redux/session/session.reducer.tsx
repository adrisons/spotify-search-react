import { SessionState } from "./session.state";
import { SessionActionTypes } from "./session.types";

const INITIAL_STATE: SessionState = {
  loggedIn: false,
  accessToken: undefined,
  tokenExpiryDate: undefined,
};

const sessionReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case SessionActionTypes.SET_LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      };
    case SessionActionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: action.payload,
      };
    case SessionActionTypes.SET_TOKEN_EXPIRY_DATE:
      return {
        ...state,
        tokenExpiryDate: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
