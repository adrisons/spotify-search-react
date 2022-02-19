import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./SearchForm.scss";

const SearchForm = ({ searchFn }: { searchFn: (term: string) => void }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleInputChange = (term: string) => {
    setErrorMsg("");
    setSearchTerm(term);
  };

  const handleSearch = (event: any) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      setErrorMsg("");
      searchFn(searchTerm);
    } else {
      setErrorMsg("Please enter a search term");
    }
  };

  return (
    <div className="search">
      <form onSubmit={handleSearch}>
        <FiSearch className="search__icon" />
        <input
          className="search__input"
          type="search"
          name="searchTerm"
          value={searchTerm}
          placeholder="Search for album, artist or playlist"
          onChange={(event) => handleInputChange(event?.target.value)}
          autoComplete="off"
        />
        {errorMsg && <p className="search__error">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default SearchForm;
