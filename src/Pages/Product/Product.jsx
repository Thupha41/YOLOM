import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import DescriptionBox from "../../components/DescriptionBox/DescriptionBox";
import Newsletter from "../../components/NewSletters/Newsletter";
import RecentlyViewedProducts from "../../components/RecentlyViewedProducts/RecentlyViewedProducts";
import axios from "axios";

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const [product, setProduct] = useState(null);
  const { Slug } = useParams();

  useEffect(() => {
    // Fetch product data when component mounts
    const fetchProduct = async () => {
      try {
        // Find the product based on slug
        const foundProduct = all_product.find(
          (product) => product.sku_slug === Slug
        );
        if (foundProduct) {
          // If product is found, fetch its details
          const response = await axios.get(
            `https://api.yourrlove.com/v1/web/products/productdetails/${foundProduct.sku_id}`
          );
          setProduct(response.data.metadata);
        } else {
          console.error("Product not found for slug:", Slug);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [Slug, all_product]);

  if (!product) {
    return (
      <div>
        <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
      </div>
    );
  }

  return (
    <div>
      <Breadcrumb product={product} />
      <ProductDisplay product={product} />
      {/* <DescriptionBox /> */}
      <RecentlyViewedProducts />
      <Newsletter />
    </div>
  );
};

export default Product;
