import React, { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { SearchResultsList } from "../SearchResultList/SearchResultsList";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchIconClick = async () => {
    if (searchValue.trim() === "") {
      // If the search query is empty, set search results to an empty array
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.yourrlove.com/v1/web/products/search",
        { query: searchValue }
      );
      setSearchResults(response.data.metadata);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  // Render the SearchBar and SearchResultsList components
  return (
    <>
      <div className="relative group hidden sm:block">
        <input
          type="text"
          placeholder="search"
          className="w-[200px] sm:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
          onChange={handleSearchInputChange}
          value={searchValue}
        />
        <IoMdSearch
          className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer"
          onClick={handleSearchIconClick}
        />
      </div>
      <SearchResultsList results={searchResults} />
    </>
  );
};

export default SearchBar;
