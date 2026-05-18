import { useEffect, useState, type ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@application/store/hooks";
import {
  applyTokenRefresh,
  logout,
  selectIsValidSession,
  selectRefreshToken,
} from "@application/store/session/sessionSlice";
import { refreshAccessToken } from "@infrastructure/spotify";
import { getClientId } from "@config/oauth";
import { Skeleton } from "@ui/components/Skeleton";

interface SessionBootstrapProps {
  children: ReactNode;
}

export function SessionBootstrap({ children }: SessionBootstrapProps) {
  const dispatch = useAppDispatch();
  const isValidSession = useAppSelector(selectIsValidSession);
  const refreshToken = useAppSelector(selectRefreshToken);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      if (isValidSession) {
        if (!cancelled) setIsReady(true);
        return;
      }

      if (!refreshToken) {
        if (!cancelled) setIsReady(true);
        return;
      }

      const tokenData = await refreshAccessToken(refreshToken, getClientId());

      if (cancelled) return;

      if (tokenData) {
        dispatch(
          applyTokenRefresh({
            accessToken: tokenData.access_token,
            expiresInMs: tokenData.expires_in * 1000,
            refreshToken: tokenData.refresh_token,
          })
        );
      } else {
        dispatch(logout());
      }

      setIsReady(true);
    }

    void restoreSession();

    return () => {
      cancelled = true;
    };
  }, [dispatch, isValidSession, refreshToken]);

  if (!isReady) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-zinc-950"
        role="status"
        aria-label="Restoring session"
      >
        <div className="flex flex-col items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    );
  }

  return children;
}
