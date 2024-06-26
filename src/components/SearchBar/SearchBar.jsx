import React, { useState, useEffect, useCallback } from "react";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";
import { SearchResultsList } from "../SearchResultList/SearchResultsList";
import "./SearchBar.css";
import debounce from "lodash.debounce";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = useCallback(
    debounce(async (query) => {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }
      try {
        setLoading(true);
        console.log("Fetching results for:", query);
        const response = await axios.post(
          "https://api.yourrlove.com/v1/web/products/search",
          { query }
        );

        console.log("API Response:", response.data.metadata);

        // Use Set to ensure uniqueness
        const uniqueResults = Array.from(
          new Set(response.data.metadata.map((a) => a.sku_id))
        ).map((id) => {
          return response.data.metadata.find((a) => a.sku_id === id);
        });

        console.log("Unique Results:", uniqueResults);

        setSearchResults(uniqueResults);
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchSearchResults(searchValue);
  }, [searchValue, fetchSearchResults]);

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="search-bar-container relative">
      <div className="relative group hidden sm:block">
        <input
          type="text"
          placeholder="Search for product name, color,..."
          className="w-[300px] sm:w-[300px] transition-all duration-300 border border-gray-300 px-2 py-1 focus:outline-none focus:border-1 focus:border-primary dark:border-gray-500 dark:bg-gray-800"
          onChange={handleSearchInputChange}
          value={searchValue}
        />
        {loading ? (
          <div className="absolute top-1/2 -translate-y-1/2 right-3">
            <svg
              aria-hidden="true"
              className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
              <span className="sr-only">Loading...</span>
            </svg>
          </div>
        ) : (
          <IoMdSearch className="text-gray-500 group-hover:text-primary absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer" />
        )}
      </div>
      {searchValue.trim() !== "" && (
        <SearchResultsList results={searchResults} />
      )}
    </div>
  );
};

export default SearchBar;
