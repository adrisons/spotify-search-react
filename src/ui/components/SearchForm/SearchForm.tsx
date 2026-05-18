import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { CircleAlert, Search, X } from "lucide-react";
import { useDebounce } from "@ui/hooks/useDebounce";
import { useSearchKeyboardShortcut } from "@ui/hooks/useSearchKeyboardShortcut";
import { Input } from "@ui/components/ui/input";
import { cn } from "@ui/lib/utils";

export interface SearchFormHandle {
  focus: () => void;
}

interface SearchFormProps {
  onSearch: (term: string) => void;
  onClear?: () => void;
  /** Synced from the URL (`q` param) for shareable links and browser navigation. */
  initialQuery?: string;
  debounceMs?: number;
  compact?: boolean;
}

const searchInputClassName = cn(
  "surface-control h-auto w-full text-white shadow-none",
  "placeholder:text-white/40 transition-all duration-200",
  "hover:border-white/30 hover:shadow-[0_0_32px_rgba(29,185,84,0.1),0_0_48px_rgba(139,92,246,0.06)]",
  "focus-visible:border-spotify-green/50 focus-visible:shadow-[0_0_0_1px_rgba(29,185,84,0.4),0_0_40px_rgba(29,185,84,0.15),0_0_56px_rgba(139,92,246,0.08)] focus-visible:ring-0 focus-visible:outline-none",
  "focus-ring dark:bg-transparent dark:disabled:bg-transparent",
  "aria-invalid:border-red-400/60 aria-invalid:shadow-[0_0_0_1px_rgba(248,113,113,0.25)]"
);

export const SearchForm = forwardRef<SearchFormHandle, SearchFormProps>(function SearchForm(
  { onSearch, onClear, initialQuery = "", debounceMs = 400, compact = false },
  ref
) {
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSearchedRef = useRef("");
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [errorMsg, setErrorMsg] = useState("");
  const debouncedTerm = useDebounce(searchTerm, debounceMs);
  const hasValue = searchTerm.length > 0;

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, []);

  const triggerSearch = useCallback(
    (term: string) => {
      const normalized = term.trim();
      if (!normalized || normalized === lastSearchedRef.current) return;
      lastSearchedRef.current = normalized;
      onSearch(normalized);
    },
    [onSearch]
  );

  useImperativeHandle(ref, () => ({ focus: focusInput }), [focusInput]);
  useSearchKeyboardShortcut(focusInput);

  useEffect(() => {
    const fromUrl = initialQuery.trim();
    if (fromUrl === lastSearchedRef.current) return;
    setSearchTerm(initialQuery);
    lastSearchedRef.current = fromUrl;
  }, [initialQuery]);

  useEffect(() => {
    if (debouncedTerm.trim()) {
      triggerSearch(debouncedTerm);
    }
  }, [debouncedTerm, triggerSearch]);

  const handleInputChange = (value: string) => {
    setErrorMsg("");
    setSearchTerm(value);
  };

  const handleClear = () => {
    setErrorMsg("");
    setSearchTerm("");
    lastSearchedRef.current = "";
    onClear?.();
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed !== "") {
      setErrorMsg("");
      triggerSearch(trimmed);
    } else {
      setErrorMsg("Please enter a search term");
    }
  };

  return (
    <div
      className={cn(
        "relative w-full min-w-0 transition-all duration-200",
        compact ? "py-0" : "py-1 animate-slide-up"
      )}
    >
      <form onSubmit={handleSubmit} role="search" aria-label="Search Spotify" className="w-full">
        <div className="relative">
          <div className="relative">
            <Search
              className={cn(
                "pointer-events-none absolute left-3.5 top-1/2 z-10 -translate-y-1/2 text-gray-400",
                compact ? "size-4" : "size-[18px]"
              )}
              aria-hidden="true"
            />
            <Input
              ref={inputRef}
              type="text"
              inputMode="search"
              enterKeyHint="search"
              name="searchTerm"
              value={searchTerm}
              placeholder="Search for album, artist or playlist"
              onChange={(e) => handleInputChange(e.target.value)}
              autoComplete="off"
              aria-label="Search for album, artist or playlist"
              aria-keyshortcuts="Meta+K Control+K"
              aria-invalid={errorMsg ? true : undefined}
              aria-describedby={errorMsg ? "search-error" : undefined}
              className={cn(
                searchInputClassName,
                compact ? "py-2 pl-9 pr-14 text-sm" : "py-2.5 pl-10 pr-16 text-base"
              )}
            />
            <div
              className={cn(
                "absolute top-1/2 right-2 z-10 flex h-6 w-11 -translate-y-1/2 items-center justify-end",
                compact && "right-1.5 w-10"
              )}
            >
              {errorMsg ? (
                <span
                  className="flex size-6 items-center justify-center text-red-400"
                  title={errorMsg}
                  role="alert"
                >
                  <CircleAlert className="size-4 shrink-0" aria-hidden="true" />
                  <span id="search-error" className="sr-only">
                    {errorMsg}
                  </span>
                </span>
              ) : hasValue ? (
                <button
                  type="button"
                  onClick={handleClear}
                  aria-label="Clear search"
                  className="flex size-6 cursor-pointer items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-spotify-green focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                >
                  <X className="size-4" aria-hidden="true" />
                </button>
              ) : (
                <kbd
                  className="inline-flex shrink-0 items-center gap-0.5 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-sans text-[10px] font-medium text-gray-400"
                  aria-hidden="true"
                >
                  <span>⌘</span>K
                </kbd>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
});
