import PropTypes from "prop-types";
import "./SearchResultsList.css";
import formatNumber from "../../utils/formatCurrency";
import { Link } from "react-router-dom";
export const SearchResultsList = ({ results }) => {
  return (
    <div className="results-list">
      {results.map((result) => (
        <div
          key={result.sku_id}
          className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
        >
          <div className="pb-4 md:pb-8 w-full md:w-40 ml-4">
            <Link
              to={`{product/${result.sku_slug}}`}
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            >
              <img
                className="w-40 hidden md:block"
                src={result.sku_image[0]}
                alt={result.Product.product_name}
              />
              <img
                className="w-full md:hidden"
                src={result.sku_image[0]}
                alt={result.Product.product_name}
              />
            </Link>
          </div>
          <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
            <div className="w-full flex flex-col justify-start items-start space-y-8">
              <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                <Link
                  to={`{product/${result.sku_slug}}`}
                  onClick={() => {
                    window.scrollTo(0, 0);
                  }}
                >
                  {result.Product.product_name}
                </Link>
              </h3>
              <div className="flex justify-start items-start flex-col space-y-2">
                <p className="text-sm leading-none text-gray-800">
                  <span className="text-gray-500">Brand: </span>{" "}
                  {result.Product.Brand.name}
                </p>
                <p className="text-sm leading-none text-gray-800">
                  <span className="text-gray-500">Color: </span>{" "}
                  {result.sku_color}
                </p>
                <p className="text-sm leading-none text-gray-800">
                  <span className="text-gray-500">Size: </span>{" "}
                  {result.sku_size}
                </p>
              </div>
            </div>
            <div className="flex justify-between space-x-8 items-start w-full">
              <p className="text-base xl:text-lg leading-6">
                {formatNumber(result.Product.product_price)} đ
              </p>
              <p className="text-base xl:text-lg leading-6 text-gray-800">
                Qty: {result.sku_quantity}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

SearchResultsList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};
