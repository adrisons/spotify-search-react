import type { ReactNode } from "react";
import { FaSpotify } from "react-icons/fa";
import { cn } from "@ui/lib/utils";

interface NavbarProps {
  onLogout: () => void;
  isSearchDocked?: boolean;
  search?: ReactNode;
}

export function Navbar({ onLogout, isSearchDocked = false, search }: NavbarProps) {
  return (
    <header
      className="surface-chrome relative sticky top-0 z-50 border-b border-white/10 animate-fade-in after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-gradient-to-r after:from-transparent after:via-spotify-green/50 after:to-transparent"
      aria-label="Main navigation"
    >
      <nav className="layout-page flex flex-wrap items-center gap-x-3 gap-y-3 py-3">
        <div className="flex shrink-0 items-center gap-2.5">
          <FaSpotify className="text-2xl text-spotify-green" aria-hidden="true" />
          <span
            className={cn(
              "type-brand transition-opacity duration-200",
              isSearchDocked && "sr-only"
            )}
          >
            Spotify Music Search
          </span>
        </div>

        <button
          type="button"
          onClick={onLogout}
          className={cn(
            "surface-control shrink-0 cursor-pointer px-4 py-1.5 type-body transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-white focus-ring",
            isSearchDocked ? "order-3" : "order-1 ml-auto"
          )}
        >
          Logout
        </button>

        {search && (
          <div
            className={cn(
              "min-w-0 transition-all duration-200",
              isSearchDocked ? "order-2 flex-1 basis-0" : "order-last w-full basis-full"
            )}
          >
            {search}
          </div>
        )}
      </nav>
    </header>
  );
}
