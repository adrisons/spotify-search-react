import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="text-center glass rounded-2xl p-10 animate-scale-in shadow-2xl shadow-black/30">
        <h1 className="text-6xl font-bold mb-2 text-spotify-green">404</h1>
        <p className="text-gray-400 mb-6">Page not found</p>
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
