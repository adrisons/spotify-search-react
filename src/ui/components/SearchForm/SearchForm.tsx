import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useDebounce } from "@ui/hooks/useDebounce";

interface SearchFormProps {
  onSearch: (term: string) => void;
  debounceMs?: number;
}

export function SearchForm({ onSearch, debounceMs = 400 }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const debouncedTerm = useDebounce(searchTerm, debounceMs);

  useEffect(() => {
    if (debouncedTerm.trim()) {
      onSearch(debouncedTerm);
    }
  }, [debouncedTerm, onSearch]);

  const handleInputChange = (value: string) => {
    setErrorMsg("");
    setSearchTerm(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      setErrorMsg("");
      onSearch(searchTerm);
    } else {
      setErrorMsg("Please enter a search term");
    }
  };

  return (
    <div className="relative w-full px-5 py-4 animate-slide-up">
      <form onSubmit={handleSubmit} role="search" aria-label="Search Spotify" className="relative">
        <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-lg" aria-hidden="true" />
        <input
          type="search"
          name="searchTerm"
          value={searchTerm}
          placeholder="Search for album, artist or playlist"
          onChange={(e) => handleInputChange(e.target.value)}
          autoComplete="off"
          aria-label="Search for album, artist or playlist"
          className="w-full rounded-full glass border-white/10 py-2.5 pl-10 pr-4 text-white placeholder-gray-400 transition-all duration-200 focus:border-spotify-green/50 focus:shadow-[0_0_0_1px_rgba(29,185,84,0.2)] focus:outline-none focus-ring"
        />
        {errorMsg && (
          <p className="mt-2 ml-4 text-sm text-red-400" role="alert">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
