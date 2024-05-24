import "./SearchResult.css";
import PropTypes from "prop-types";
export const SearchResult = ({ result }) => {
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
    </div>
  );
};

SearchResult.propTypes = {
  result: PropTypes.string.isRequired,
};
