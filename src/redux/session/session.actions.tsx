import { SessionActionTypes } from "./session.types";

export const setLoggedIn = (loggedIn: boolean) => ({
  type: SessionActionTypes.SET_LOGGED_IN,
  payload: loggedIn,
});
export const setAccessToken = (accessToken: string) => ({
  type: SessionActionTypes.SET_ACCESS_TOKEN,
  payload: accessToken,
});
export const setTokenExpiryDate = (tokenExpiryDate: number) => ({
  type: SessionActionTypes.SET_TOKEN_EXPIRY_DATE,
  payload: tokenExpiryDate,
});
