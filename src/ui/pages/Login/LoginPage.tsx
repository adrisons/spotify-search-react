import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { FaSpotify } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@application/store/hooks";
import {
  selectIsValidSession,
  setSession,
} from "@application/store/session/sessionSlice";
import {
  getQueryParams,
  cleanUrlParams,
  exchangeCodeForToken,
  generateCodeChallenge,
} from "@infrastructure/spotify";
import { buildAuthorizeUrl, getClientId, getRedirectUri } from "@config/oauth";

export function LoginPage() {
  const isValidSession = useAppSelector(selectIsValidSession);
  const dispatch = useAppDispatch();
  const [isExchanging, setIsExchanging] = useState(false);
  const hasStartedExchange = useRef(false);

  useEffect(() => {
    const params = getQueryParams();
    const code = params["code"];

    if (!code || hasStartedExchange.current) return;

    hasStartedExchange.current = true;
    setIsExchanging(true);

    exchangeCodeForToken(code, getClientId(), getRedirectUri()).then(
      (tokenData) => {
        if (tokenData?.refresh_token) {
          dispatch(
            setSession({
              accessToken: tokenData.access_token,
              refreshToken: tokenData.refresh_token,
              expiresInMs: tokenData.expires_in * 1000,
            })
          );
          cleanUrlParams();
        }
        setIsExchanging(false);
      }
    );
  }, [dispatch]);

  if (isValidSession) {
    return <Navigate to="/" />;
  }

  const handleLogin = async () => {
    const codeChallenge = await generateCodeChallenge();
    const authorizeUrl = buildAuthorizeUrl(codeChallenge);
    window.location.href = authorizeUrl;
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-zinc-700 to-zinc-950">
      <div className="glass rounded-2xl p-10 flex flex-col items-center gap-6 animate-scale-in shadow-2xl shadow-black/30">
        <FaSpotify className="text-spotify-green text-6xl" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Spotify Music Search
        </h1>
        <p className="text-gray-400 text-sm text-center max-w-[240px]">
          Sign in to search for your favourite artists, albums and tracks.
        </p>
        {isExchanging ? (
          <p className="text-gray-300 text-sm animate-pulse">
            Signing in...
          </p>
        ) : (
          <button
            aria-label="Log in using Spotify"
            onClick={handleLogin}
            className="cursor-pointer rounded-full bg-spotify-green px-8 py-3 text-base font-bold text-black transition-all duration-200 hover:bg-spotify-green-light hover:scale-[1.03] hover:shadow-lg hover:shadow-spotify-green/20 active:scale-[0.98] border-none focus-ring"
          >
            Log in with Spotify
          </button>
        )}
      </div>
    </main>
  );
}
