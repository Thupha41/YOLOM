import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { SearchResultsList } from "../SearchResultList/SearchResultsList";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchValue.trim() === "") {
        setSearchResults([]); // Thiết lập searchResults thành một mảng rỗng
        return;
      }
      try {
        setLoading(true);
        const response = await axios.post(
          "https://api.yourrlove.com/v1/web/products/search",
          { query: searchValue }
        );
        setSearchResults(response.data.metadata);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [searchValue]);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
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
        {loading ? (
          <div className="absolute top-1/2 -translate-y-1/2 right-3">
            <div className="w-5 h-5 border-2 border-t-2 border-gray-400 rounded-full animate-spin"></div>
          </div>
        ) : (
          <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" />
        )}
      </div>
      {searchValue.trim() !== "" && (
        <SearchResultsList results={searchResults} />
      )}
    </>
  );
};

export default SearchBar;
