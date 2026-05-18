import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center px-5 text-white">
      <div className="surface-panel animate-scale-in rounded-3xl p-10 text-center">
        <p className="mb-2 text-6xl font-bold text-gradient">404</p>
        <p className="type-muted mb-6">Page not found</p>
        <Link
          to="/"
          className="text-spotify-green hover:text-spotify-green-light underline transition-colors duration-200 focus-ring rounded"
        >
          Go to Home Page
        </Link>
      </div>
    </main>
  );
}
