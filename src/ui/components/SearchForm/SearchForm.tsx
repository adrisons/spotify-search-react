import { useState } from "react";
import { FiSearch } from "react-icons/fi";

interface SearchFormProps {
  onSearch: (term: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    <div className="relative w-full px-5 py-4">
      <form onSubmit={handleSubmit} className="relative">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-lg" />
        <input
          type="search"
          name="searchTerm"
          value={searchTerm}
          placeholder="Search for album, artist or playlist"
          onChange={(e) => handleInputChange(e.target.value)}
          autoComplete="off"
          className="w-full rounded-full border border-gray-700 bg-zinc-800 py-2.5 pl-10 pr-4 text-white placeholder-gray-400 focus:border-green-500 focus:outline-none"
        />
        {errorMsg && (
          <p className="mt-2 ml-4 text-sm text-red-400">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}
