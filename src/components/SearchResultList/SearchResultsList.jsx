import PropTypes from "prop-types";
import "./SearchResultsList.css";
import { Link } from "react-router-dom";

export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result, index) => {
        const uniqueKey = `${result.sku_id}-${index}`;
        console.log("Rendering item with key:", uniqueKey, "result:", result);
        return (
          <div key={uniqueKey} className="result-item">
            <Link
              to={`/product/${result.sku_slug}/${result.sku_id}`}
              className="result-link"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <img
                src={result.sku_image[0]}
                alt={result.Product.product_name}
                className="result-image"
              />
              <div className="result-details">
                <div className="product-name">
                  {result.Product.product_name}
                </div>
                <div className="product-attributes">
                  <span className="attribute">Color: {result.sku_color}</span>
                  <span className="attribute">Size: {result.sku_size}</span>
                  <span className="attribute">Price: {result.sku_price}đ</span>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

SearchResultsList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      sku_id: PropTypes.string.isRequired,
      sku_slug: PropTypes.string.isRequired,
      sku_image: PropTypes.arrayOf(PropTypes.string).isRequired,
      sku_color: PropTypes.string.isRequired,
      sku_size: PropTypes.string.isRequired,
      sku_price: PropTypes.number.isRequired,
      Product: PropTypes.shape({
        product_name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired
  ).isRequired,
};
