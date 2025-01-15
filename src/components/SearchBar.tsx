import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  searchType: "movie" | "tv";
  setSearchType: React.Dispatch<React.SetStateAction<"movie" | "tv">>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, searchType, setSearchType, setSearchQuery }) => {
  const [query, setQuery] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      onSearch(query);
      setSearchQuery(query);
    }
  };
  return (
    <>
      <div className="search-Wrapper">
        <form onSubmit={handleSubmit} className="search-bar">
          <input
            type="text"
            className="search-bar__input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a Movie..."
          />
          <button type="submit" className="search-bar__btn">
            Search
          </button>
        </form>
        <div className="search-toggle">
          <button className={searchType === "movie" ? "active" : ""} onClick={() => setSearchType("movie")}>
            Movies
          </button>
          <button className={searchType === "tv" ? "active" : ""} onClick={() => setSearchType("tv")}>
            TV Shows
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
