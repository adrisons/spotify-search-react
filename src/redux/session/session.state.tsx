export interface SessionState {
    loggedIn: boolean;
    accessToken?: string;
    tokenExpiryDate?: number;
  }