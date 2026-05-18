import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
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
  const location = useLocation();
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
    const from = (location.state as { from?: { pathname: string; search: string } } | null)
      ?.from;
    const redirectTo = from ? `${from.pathname}${from.search}` : "/";
    return <Navigate to={redirectTo} replace />;
  }

  const handleLogin = async () => {
    const codeChallenge = await generateCodeChallenge();
    const authorizeUrl = buildAuthorizeUrl(codeChallenge);
    window.location.href = authorizeUrl;
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center px-5">
      <div className="surface-panel relative flex w-full max-w-md flex-col items-center gap-6 rounded-3xl p-10 animate-scale-in">
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-white/25 via-spotify-green/10 to-violet-400/10 opacity-70"
          aria-hidden="true"
        />
        <FaSpotify className="relative text-spotify-green text-6xl drop-shadow-[0_0_24px_rgba(29,185,84,0.4)]" aria-hidden="true" />
        <h1 className="type-display relative">Spotify Music Search</h1>
        <p className="type-muted relative max-w-[260px] text-center">
          Sign in to search for your favourite artists, albums and tracks.
        </p>
        {isExchanging ? (
          <p className="type-body relative animate-pulse">
            Signing in...
          </p>
        ) : (
          <button
            aria-label="Log in using Spotify"
            onClick={handleLogin}
            className="relative cursor-pointer rounded-full bg-spotify-green px-8 py-3 text-base font-semibold text-black transition-all duration-200 hover:bg-spotify-green-light hover:scale-[1.03] hover:glow-spotify active:scale-[0.98] border-none focus-ring"
          >
            Log in with Spotify
          </button>
        )}
      </div>
    </main>
  );
}
