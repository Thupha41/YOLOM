import React, { useState } from "react";
import PropTypes from "prop-types";
import formatNumber from "../../utils/formatCurrency";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const CardItem = (props) => {
  const {
    sku_slug,
    sku_id,
    thumbnail,
    labelType,
    current_unit_price,
    oldPrice,
    name,
    brand,
    rating,
  } = props;
  const [isHovered, setIsHovered] = useState(false);
  const formattedPrice = formatNumber(current_unit_price);

  const thumbnail1 = thumbnail ? thumbnail[0] : "";
  const thumbnail2 =
    thumbnail && thumbnail.length > 1 ? thumbnail[1] : thumbnail1;

  const renderLabel = () => {
    if (!isHovered) {
      if (
        labelType &&
        (labelType.includes(".png") || labelType.includes(".jpg"))
      ) {
        return (
          <img
            src={labelType}
            alt="New Arrival"
            className="absolute top-0 left-0 h-24 w-24 transition duration-500"
          />
        );
      } else {
        return (
          <div className="absolute top-4 left-0 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
            {labelType}
          </div>
        );
      }
    }
  };

  return (
    <>
      <div className="w-full shadow-xl transition-all duration-300 ease-in-out">
        <div>{renderLabel()}</div>

        {/* Image section */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Change the src based on isHovered state */}
          <Link
            to={`/product/${sku_slug}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            <img
              className="h-[700px] w-full object-cover"
              src={isHovered ? thumbnail2 : thumbnail1}
              alt=""
            />
          </Link>
        </div>

        <div className="p-4">
          <strong className="font-semibold">
            <span className="text-lg text-gray-800">{brand}</span>
            <br />
          </strong>
          <Link
            to={`/product/${sku_slug}`}
            onClick={() => window.scrollTo(0, 0)}
          >
            {name}
          </Link>

          <ReactStars
            count={5}
            size={24}
            value={rating}
            activeColor="#ffd700"
            edit={false}
          />
          <div>
            <span>
              <span className="text-lg text-red-600 font-bold">
                {formattedPrice} <span lang="vi"> đ </span>
              </span>
            </span>
            <span className="text-sm text-gray-500 line-through ml-2">
              {oldPrice}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

CardItem.propTypes = {
  thumbnail: PropTypes.arrayOf(PropTypes.string).isRequired,
  name: PropTypes.string.isRequired,
  brand: PropTypes.string.isRequired,
  current_unit_price: PropTypes.number.isRequired,
  oldPrice: PropTypes.string.isRequired,
  labelType: PropTypes.string,
  rating: PropTypes.number.isRequired,
  grid: PropTypes.string,
  id: PropTypes.string,
  sku_slug: PropTypes.string,
  sku_id: PropTypes.string,
};

export default CardItem;
