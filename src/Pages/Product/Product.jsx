import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ProductDisplay from "../ProductDisplay/ProductDisplay";
import DescriptionBox from "../../components/DescriptionBox/DescriptionBox";
import Newsletter from "../../components/NewSletters/Newsletter";
import RecentlyViewedProducts from "../../components/RecentlyViewedProducts/RecentlyViewedProducts";

const Product = () => {
  const { all_product } = useContext(ShopContext);

  const { Slug } = useParams();
  const product = all_product.find((e) => e.sku_slug === Slug);

  console.log(product);
  console.log("SLug", Slug);
  console.log("all_product", all_product);
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
