import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  loggedIn: boolean;
  accessToken?: string;
  tokenExpiryDate?: number;
}

const initialState: SessionState = {
  loggedIn: false,
  accessToken: undefined,
  tokenExpiryDate: undefined,
};

const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setLoggedIn(state, action: PayloadAction<boolean>) {
      state.loggedIn = action.payload;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setTokenExpiryDate(state, action: PayloadAction<number>) {
      state.tokenExpiryDate = Date.now() + action.payload;
    },
    logout() {
      return initialState;
    },
  },
  selectors: {
    selectIsLoggedIn: (state) => state.loggedIn,
    selectAccessToken: (state) => state.accessToken,
    selectTokenExpiryDate: (state) => state.tokenExpiryDate,
    selectIsValidSession: (state) =>
      !!state.tokenExpiryDate && Date.now() < state.tokenExpiryDate,
  },
});

export const { setLoggedIn, setAccessToken, setTokenExpiryDate, logout } =
  sessionSlice.actions;

export const {
  selectIsLoggedIn,
  selectAccessToken,
  selectTokenExpiryDate,
  selectIsValidSession,
} = sessionSlice.selectors;

export default sessionSlice.reducer;
