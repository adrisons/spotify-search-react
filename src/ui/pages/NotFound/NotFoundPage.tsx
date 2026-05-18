import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-400 mb-6">Page not found</p>
        <Link
          to="/"
          className="text-green-500 hover:text-green-400 underline"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}
