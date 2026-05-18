import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@application/store/hooks";
import {
  selectIsValidSession,
  setLoggedIn,
  setAccessToken,
  setTokenExpiryDate,
} from "@application/store/session/sessionSlice";
import {
  getHashParams,
  removeHashParamsFromUrl,
} from "@infrastructure/spotify";
import { getAuthorizeHref } from "@config/oauth";

export function LoginPage() {
  const isValidSession = useAppSelector(selectIsValidSession);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hashParams = getHashParams();
    const accessToken = hashParams["access_token"];
    const expiresIn = hashParams["expires_in"];

    if (accessToken) {
      removeHashParamsFromUrl();
      dispatch(setLoggedIn(true));
      dispatch(setAccessToken(accessToken));
      dispatch(setTokenExpiryDate(Number(expiresIn)));
    }
  }, [dispatch]);

  if (isValidSession) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-700 to-zinc-950">
      <button
        aria-label="Log in using OAuth 2.0"
        onClick={() => window.open(getAuthorizeHref(), "_self")}
        className="cursor-pointer rounded-full bg-green-500 px-8 py-3 text-lg font-bold text-black hover:bg-green-400 transition-colors border-none"
      >
        Log in with Spotify
      </button>
    </div>
  );
}
