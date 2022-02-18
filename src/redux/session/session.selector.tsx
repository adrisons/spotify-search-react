import { createSelector } from "reselect";
import { SessionState } from "./session.state";

const selectSession = (state: { session: SessionState }) => state.session;
export const selectIsLoggedIn = createSelector(
  [selectSession],
  (session) => session.loggedIn
);
export const selectAccessToken = createSelector(
  [selectSession],
  (session) => session.accessToken
);
export const selectTokenExpiryDate = createSelector(
  [selectSession],
  (session) => session.tokenExpiryDate
);
