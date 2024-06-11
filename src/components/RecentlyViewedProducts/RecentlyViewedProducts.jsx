import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../../context/ShopContext";
import { getRecentlyViewedProducts } from "../../utils/recentlyViewed";
import CardItem from "../CardItem/CardItem";
import Slider from "react-slick";
import SamplePrevArrow from "../Arrows/SamplePrevArrow";
import SampleNextArrow from "../Arrows/SampleNextArrow";
import "./RecentlyViewProducts.css";

const RecentlyViewedProducts = () => {
  const [canNext, setCanNext] = useState(true);
  const [canPrev, setCanPrev] = useState(false);
  const [slidesToShow, setSlidesToShow] = useState(1);

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow disabled={!canNext} />,
    prevArrow: <SamplePrevArrow disabled={!canPrev} />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    afterChange: (index) => handleSlideChange(index),
  };

  const handleSlideChange = (index) => {
    setCanPrev(index > 0);
    setCanNext(index + slidesToShow < recentlyViewed.length);
  };

  const { all_product } = useContext(ShopContext);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    const viewedProducts = getRecentlyViewedProducts();
    const detailedProducts = viewedProducts
      .map((viewedProduct) =>
        all_product.find((product) => product.sku_id === viewedProduct.sku_id)
      )
      .filter(Boolean);
    setRecentlyViewed(detailedProducts);
  }, [all_product]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setSlidesToShow(3);
      } else if (window.innerWidth >= 1025) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!recentlyViewed.length) return null;

  return (
    <div className="product-slider mt-40 mb-20">
      <h3
        data-aos="fade-up"
        className="text-3xl font-semibold text-center max-w-[600px] mx-auto tracking-wide font-spartan"
      >
        Recently Viewed Products
      </h3>
      <div
        data-aos="fade-up"
        className="max-w-screen-2xl mx-auto container xl:px-28 px-4 mt-16"
      >
        <Slider {...settings}>
          {recentlyViewed.map((product) => (
            <div className="px-2" key={product.sku_id}>
              {product.Product && (
                <CardItem
                  id={product.Product.product_id}
                  thumbnail={product.sku_image}
                  name={product.Product.product_name}
                  oldPrice={product.oldPrice}
                  current_unit_price={product.Product.product_price}
                  labelType={product.labelType}
                  brand={product.Product.Brand.name}
                  rating={product.Product.product_rating}
                  sku_slug={product.sku_slug}
                />
              )}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default RecentlyViewedProducts;
