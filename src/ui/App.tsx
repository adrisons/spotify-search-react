import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { GradientBackground } from "@ui/components/GradientBackground";
import { Skeleton } from "@ui/components/Skeleton";
import { SessionBootstrap } from "@ui/providers/SessionBootstrap";

const LoginPage = lazy(() =>
  import("@ui/pages/Login/LoginPage").then((m) => ({ default: m.LoginPage }))
);
const DashboardPage = lazy(() =>
  import("@ui/pages/Dashboard/DashboardPage").then((m) => ({
    default: m.DashboardPage,
  }))
);
const NotFoundPage = lazy(() =>
  import("@ui/pages/NotFound/NotFoundPage").then((m) => ({
    default: m.NotFoundPage,
  }))
);

function PageFallback() {
  return (
    <div className="relative flex min-h-screen items-center justify-center" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <Skeleton className="h-12 w-12 rounded-full" />
        <Skeleton className="h-4 w-32" />
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const hasOAuthCode = new URLSearchParams(location.search).has("code");

  if (hasOAuthCode && location.pathname !== "/login") {
    return <Navigate to={`/login${location.search}`} replace />;
  }

  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<DashboardPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </Suspense>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <GradientBackground />
      <SessionBootstrap>
        <AppRoutes />
      </SessionBootstrap>
    </BrowserRouter>
  );
}
