import { IoMdSearch } from "react-icons/io";
import "./SearchFilter.css";
import PropTypes from "prop-types";
const SearchFilter = ({ handleInputChange, query }) => {
  return (
    <nav>
      <div>
        <input
          className="search-input"
          type="text"
          onChange={handleInputChange}
          value={query}
          placeholder="Enter your search shoes."
        />
        <IoMdSearch />
      </div>
    </nav>
  );
};
SearchFilter.propTypes = {
  query: PropTypes.string,
  handleInputChange: PropTypes.func,
};
export default SearchFilter;
