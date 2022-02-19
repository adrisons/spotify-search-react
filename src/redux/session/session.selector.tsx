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
const _isValidSession = (expiryTime: number) => {
  const currentTime = new Date().getTime();
  const isSessionValid = currentTime < expiryTime;

  return isSessionValid;
};
export const selectIsValidSession = createSelector(
  [selectSession],
  (session) =>
    !!session.tokenExpiryDate && _isValidSession(session.tokenExpiryDate)
);
