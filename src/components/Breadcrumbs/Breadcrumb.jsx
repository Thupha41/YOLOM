import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const categoryToPathMap = {
  "New Arrival": "new-arrival",
  sale: "promotion",
};

const convertCategoryToPath = (category) => {
  if (categoryToPathMap[category]) {
    return categoryToPathMap[category];
  }
  return category;
};

const Breadcrumb = (props) => {
  const { product, tag, brand } = props;
  const categoryTagPath = product
    ? convertCategoryToPath(product?.Product?.Tag?.name)
    : convertCategoryToPath(tag);
  const categoryBrandPath = product
    ? convertCategoryToPath(product?.Product?.Brand?.name)
    : convertCategoryToPath(brand);

  return (
    <div className="breadcrumb ml-[130px]">
      <nav aria-label="breadcrumb" className="mt-10 ml-10">
        <ol className="breadcrumb flex align-items-center">
          <li className="breadcrumb-item">
            <a
              href="/"
              className="text-red-600 hover:text-blue-700 font-semibold text-[16px]"
            >
              YOLOM
            </a>
          </li>
          <span className="mx-2 text-[16px]">{">"}</span>

          {product && (
            <>
              {product.Product.Tag?.name ? (
                <>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link to={`/${categoryTagPath}`}>
                      <span className="text-[16px] flex items-center text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
                        {product.Product.Tag.name}
                      </span>
                    </Link>
                  </li>
                  <span className="mx-2">{">"}</span>
                </>
              ) : null}
              {product.Product.Brand?.name ? (
                <>
                  <li className="breadcrumb-item active" aria-current="page">
                    <Link to={`/${categoryBrandPath}`}>
                      <span className="text-[16px] flex items-center text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
                        {product.Product.Brand.name}
                      </span>
                    </Link>
                  </li>
                  <span className="mx-2 text-[16px]">{">"}</span>
                </>
              ) : null}
              <li className="breadcrumb-item active" aria-current="page">
                <span className="text-[16px]">
                  {product.Product.product_name}
                </span>
              </li>
            </>
          )}
          {!product && tag && (
            <>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={`/${categoryTagPath}`}>
                  <span className="text-[16px] flex items-center text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
                    {tag}
                  </span>
                </Link>
              </li>
              <span className="mx-2">{">"}</span>
            </>
          )}
          {!product && brand && (
            <>
              <li className="breadcrumb-item active" aria-current="page">
                <Link to={`/${categoryBrandPath}`}>
                  <span className="text-[16px] flex items-center text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500">
                    {brand}
                  </span>
                </Link>
              </li>
              <span className="mx-2">{">"}</span>
            </>
          )}
        </ol>
      </nav>
    </div>
  );
};

Breadcrumb.propTypes = {
  product: PropTypes.shape({
    Product: PropTypes.shape({
      Tag: PropTypes.shape({
        name: PropTypes.string,
      }),
      Brand: PropTypes.shape({
        name: PropTypes.string,
      }),
      product_name: PropTypes.string,
    }).isRequired,
  }),
  tag: PropTypes.string,
  brand: PropTypes.string,
};

export default Breadcrumb;
