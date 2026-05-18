import { FaSpotify } from "react-icons/fa";

interface NavbarProps {
  onLogout: () => void;
}

export function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between glass-strong px-5 py-3 border-b border-white/5 animate-fade-in"
      aria-label="Main navigation"
    >
      <div className="flex items-center gap-2.5">
        <FaSpotify className="text-spotify-green text-3xl" aria-hidden="true" />
        <span className="text-xl font-semibold text-white tracking-tight">
          Spotify Music Search
        </span>
      </div>
      <button
        onClick={onLogout}
        className="cursor-pointer rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-white transition-all duration-200 hover:bg-white/10 hover:border-white/20 focus-ring"
      >
        Logout
      </button>
    </nav>
  );
}
