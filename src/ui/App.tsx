import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Skeleton } from "@ui/components/Skeleton";

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
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <Skeleton className="h-10 w-48" />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DashboardPage />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
