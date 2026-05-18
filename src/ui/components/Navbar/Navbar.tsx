import { FaSpotify } from "react-icons/fa";

interface NavbarProps {
  onLogout: () => void;
}

export function Navbar({ onLogout }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between bg-black px-5 py-3">
      <div className="flex items-center gap-2">
        <FaSpotify className="text-green-500 text-3xl" />
        <span className="text-xl font-semibold text-white">
          Spotify Music Search
        </span>
      </div>
      <button
        onClick={onLogout}
        className="cursor-pointer border-none bg-transparent text-white hover:text-green-400 transition-colors"
      >
        Logout
      </button>
    </nav>
  );
}
