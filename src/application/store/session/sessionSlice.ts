import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface SessionState {
  loggedIn: boolean;
  accessToken?: string;
  refreshToken?: string;
  tokenExpiryDate?: number;
}

const initialState: SessionState = {
  loggedIn: false,
  accessToken: undefined,
  refreshToken: undefined,
  tokenExpiryDate: undefined,
};

export interface SessionTokensPayload {
  accessToken: string;
  refreshToken: string;
  expiresInMs: number;
}

export interface TokenRefreshPayload {
  accessToken: string;
  expiresInMs: number;
  refreshToken?: string;
}

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
    setRefreshToken(state, action: PayloadAction<string>) {
      state.refreshToken = action.payload;
    },
    setTokenExpiryDate(state, action: PayloadAction<number>) {
      state.tokenExpiryDate = Date.now() + action.payload;
    },
    setSession(state, action: PayloadAction<SessionTokensPayload>) {
      state.loggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.tokenExpiryDate = Date.now() + action.payload.expiresInMs;
    },
    applyTokenRefresh(state, action: PayloadAction<TokenRefreshPayload>) {
      state.loggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.tokenExpiryDate = Date.now() + action.payload.expiresInMs;
      if (action.payload.refreshToken) {
        state.refreshToken = action.payload.refreshToken;
      }
    },
    logout() {
      return initialState;
    },
  },
  selectors: {
    selectIsLoggedIn: (state) => state.loggedIn,
    selectAccessToken: (state) => state.accessToken,
    selectRefreshToken: (state) => state.refreshToken,
    selectTokenExpiryDate: (state) => state.tokenExpiryDate,
    selectIsValidSession: (state) =>
      !!state.tokenExpiryDate && Date.now() < state.tokenExpiryDate,
  },
});

export const {
  setLoggedIn,
  setAccessToken,
  setRefreshToken,
  setTokenExpiryDate,
  setSession,
  applyTokenRefresh,
  logout,
} = sessionSlice.actions;

export const {
  selectIsLoggedIn,
  selectAccessToken,
  selectRefreshToken,
  selectTokenExpiryDate,
  selectIsValidSession,
} = sessionSlice.selectors;

export default sessionSlice.reducer;
